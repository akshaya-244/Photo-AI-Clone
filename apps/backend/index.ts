import express from "express"
import {TrainModel, GenerateImage, GenerateImagesFromPack} from "@repo/common/types"
import {prismaClient} from "@repo/db"
import { S3Client} from "bun"
import { FalAIModel } from "./models/FalAIModel"
import cors from "cors"
import { authMiddleware } from "./middleware"

const app=express()
app.use(cors())
app.use(express.json())
const falAiModel = new FalAIModel()
const PORT = process.env.PORT || 8080

app.get('/pre-signed-url-thumbnail', (req, res) => {
    const key=`${Date.now()}_${Math.random()}`
    const url =  S3Client.presign(`${key}`,{
        method: "PUT",
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        endpoint: process.env.ENDPOINT,
        bucket: process.env.BUCKET_NAME2,
        expiresIn: 5*60,
        type: "application/zip"
    })

    res.json({
        url,
        key
    })

})

app.get('/pre-signed-url',  (req, res) => {
    const key=  `models/${Date.now()}_${Math.random()}.zip`
    const url =  S3Client.presign(`models/${Date.now()}_${Math.random()}.zip`,{
        method: "PUT",
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        endpoint: process.env.ENDPOINT,
        bucket: process.env.BUCKET_NAME,
        expiresIn: 5*60,
        type: "application/zip"
    })


    res.json({
        url, 
        key
    })
})
app.post('/ai/training',authMiddleware, async(req, res) => {
    const parsedBody = TrainModel.safeParse(req.body)
    console.log(req.body)
    console.log(parsedBody)
    if(!parsedBody.success)
    {
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return;
    }


    const {request_id, response_url} =await falAiModel.trainImages(parsedBody.data.zipUrl,parsedBody.data.name)

    const data=await prismaClient.models.create({
        data:{
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethnicity: parsedBody.data.ethnicity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
            userId: req.body.userId!,
            zipUrl: parsedBody.data.zipUrl,
            falAiRequestId: request_id
        }
    })

    res.json({
        modelId: data.id
    })
})

app.post('/ai/generate',authMiddleware,async (req, res) => {
    const parsedBody=GenerateImage.safeParse(req.body)
    if(!parsedBody.success)
    {
        res.status(411).json({
            message: "Incorrect Inputs"
        })
        return
    }
    const model=await prismaClient.models.findUnique({
        where:{
            id: parsedBody.data.modelId
        }
    })

    if(!model || !model.tensorPath)
    {
        res.status(411).json({
            message: "Model not found"
        })
    }
    const {request_id, response_url}=await falAiModel.generateImage(parsedBody.data.prompt, model?.tensorPath ?? "")
    const data=await prismaClient.generatedImages.create({
        data:{
            modelId: parsedBody.data.modelId,
            prompt: parsedBody.data.prompt,
            imageURL: "",
            userId: req.body.userId!,
            falAiRequestId: request_id 

        }
    })
    res.json({
        imageId: data.id
    })

})

app.post('/pack/generate',authMiddleware, async(req, res) => {
    //generate images for a specific pack
    const parsedBody= GenerateImagesFromPack.safeParse(req.body)
    if(!parsedBody.success){
        res.status(411).json({
            message: "Incorrect Inputs"
        })
        return;
    }
    const prompts= await prismaClient.packPrompt.findMany({
        where:{
            packId: parsedBody.data.packId

        }
    })

    let requestIds: {request_id:string}[] = await Promise.all(prompts.map((prompt) => falAiModel.generateImage(prompt.prompt,parsedBody.data.modelId)))

    prompts.forEach(async(prompt) => {
        const {request_id, response_url} = await falAiModel.generateImage(prompt.prompt, parsedBody.data.modelId)
    })
    const images= await prismaClient.generatedImages.createManyAndReturn({
        data: prompts.map((prompt, index) => ({
            prompt: prompt.prompt,
            userId: req.body.userId!,
            modelId: parsedBody.data.modelId,
            imageUrl:"",
            falAiRequestId: requestIds[index].request_id
            

        }))

    })
    res.json({
        images: images.map((image) => image.id)
    })
})

app.get('/pack/bulk', async(req, res) => {

    const packs=await prismaClient.pack.findMany({})
    res.json({
        packs
    })
})

app.get('/models', authMiddleware, async(req, res)=>{
    const models=await prismaClient.models.findMany({
        where:{
            userId: req.body.userId
        }
    })
    res.json({
        models
    })
})
app.get('/image/bulk',authMiddleware,async (req, res) => {
    const ids=req.query.images as string[]
    const limit= req.query.limit as string || "10"
    const offset=req.query.offset as string || "0"

    const imagesData = await prismaClient.generatedImages.findMany({
        where: {
            id: { in : ids},
            userId: req.body.userId!
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    })
    res.json({
        images: imagesData
    })
})


app.post('/fal-ai/webhook/train', async(req, res) => {

    console.log(req.body)
    const request_id= req.body.request_id;
    const {imageUrl}=await falAiModel.generateImageSync(req.body.tensorPath)
    await prismaClient.models.updateMany({
        where:{
            falAiRequestId: request_id
        },
        data:{
            trainingStatus:"Generated",
            tensorPath: req.body.tensorPath,
            thumbnail: imageUrl

        }
    })
    res.json({
        message: "Webhook recievedd"
    })
})

app.post('/fal-ai/webhook/image', async(req, res) => {
    const request_id=req.body.request_id
    await prismaClient.generatedImages.updateMany({
        where:{
            falAiRequestId: request_id
        },
        data:{
            status: "Generated",
            imageURL: req.body.image_url
        }
    })
    res.json({
        message: "Webhook recievedd"
    })
})

app.listen(PORT , () => {
    console.log(`Server is running on PORT: ${PORT}` )
})
