import express from "express"
import {TrainModel, GenerateImage, GenerateImagesFromPack} from "@repo/common/types"
import {prismaClient} from "@repo/db"
import { S3Client} from "bun"
import { FalAIModel } from "./models/FalAIModel"
import cors from "cors"
import { authMiddleware } from "./middleware"
import { fal } from "@fal-ai/client"

const app=express()
app.use(cors())
app.use(express.json())
const falAiModel = new FalAIModel()
const PORT = process.env.PORT || 8080
const stripe=require("stripe")(process.env.NEXT_STRIPE_SECRET_KEY)
const endpointSecret=process.env.STRIPE_WEBHOOK_SECRET;
app.get('/pre-signed-url',  (req, res) => {
    const key=  `models/${Date.now()}_${Math.random()}.zip`
    const url =  S3Client.presign(`${key}.zip`,{
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
// app.get('/modal', (req, res) => {
//     console.log("Req: " ,req)
//     console.log("Requ: " ,req.body)
//      res.json({
//         message: "Hekki"
//     })

// })
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
    console.log(model?.tensorPath)
    if(!model || !model.tensorPath)
    {
        res.status(411).json({
            message: "Model not found"
        })
    }
    const {request_id, response_url}=await falAiModel.generateImage(parsedBody.data.prompt, model?.tensorPath ?? "")
    console.log("Request_ID: ", request_id)
    console.log("response_url: ", response_url)

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
    let requestIds: {request_id:string}[] = await Promise.all(prompts.map((prompt) => falAiModel.generateImage(prompt.prompt,model?.tensorPath ?? "")))

    
    // const request_ids: { request_id: string }[] = [];
    // prompts.forEach(async(prompt) => {
    //     const {request_id, response_url} = await falAiModel.generateImage(prompt.prompt, model?.tensorPath ?? "")
    //     request_ids.push({request_id});
    // })
    console.log("Req_idsss",requestIds)
    const images= await prismaClient.generatedImages.createManyAndReturn({
        data: prompts.map((prompt, index) => ({
            prompt: prompt.prompt,
            userId: req.body.userId!,
            modelId: parsedBody.data.modelId,
            imageURL:"",
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
            OR: [{userId: req.body.userId},{open: true}]
        }
    })
    res.json({
        models
    })
})
app.get('/image/bulk',authMiddleware,async (req, res) => {
    const ids=req.query.ids as string[]
    const limit= req.query.limit as string || "10"
    const offset=req.query.offset as string || "0"

    const imagesData = await prismaClient.generatedImages.findMany({
        where: {
            id: { in : ids},
            userId: req.body.userId!,
            status: {
                not: "Failed",
            },
        },
        orderBy:{
            createdAt: "desc",
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
    const request_id= req.body.request_id as string;
    const {imageUrl}=await falAiModel.generateImageSync(req.body.tensorPath)
    console.log("Thumbnail: ",imageUrl)
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
    console.log("Webhook image",req.body.request_id)
    
    const request_id=req.body.request_id
    // const status = await fal.queue.status("fal-ai/flux-lora", {
    //     requestId: request_id,
    //     logs: true,
    //   });
      
    //   if(status.status==="COMPLETED"){
    const result = await fal.queue.result("fal-ai/flux-lora", {
        requestId: request_id
        // requestId:"459e00e5-3372-4b44-bd1c-0513e05c5b45"
        });
        const a=result.data.images[0].url
    await prismaClient.generatedImages.updateMany({
        where:{
            falAiRequestId: request_id
        },
        data:{
            status: "Generated",
            imageURL: result.data.images[0].url
        }
    })
    res.json({
        result
        
    })
    //   }
    //   else{
    //     res.json({
    //         message: "Unable to complete"
            
    //     })
    //   }
        
})

// app.post('/webhook/stripe', authMiddleware, async(request, response) => {
//     console.log("Stripeeeeeeeee")
//     let event = request.body;
//     // Only verify the event if you have an endpoint secret defined.
//     // Otherwise use the basic event deserialized with JSON.parse
//     if (endpointSecret) {
//       // Get the signature sent by Stripe
//       const signature = request.headers['stripe-signature'];
//       try {
//         event = stripe.webhooks.constructEvent(
//           request.body,
//           signature,
//           endpointSecret
//         );
//         response.json({})
//       } catch (err) {
//         console.log(`⚠️  Webhook signature verification failed.`, err.message);
//         return response.sendStatus(400);
//       }
//     }
  
//     // Handle the event
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object;
//         console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//         // Then define and call a method to handle the successful payment intent.
//         // handlePaymentIntentSucceeded(paymentIntent);
//         break;
//       case 'payment_method.attached':
//         const paymentMethod = event.data.object;
//         // Then define and call a method to handle the successful attachment of a PaymentMethod.
//         // handlePaymentMethodAttached(paymentMethod);
//         break;
//         case 'checkout.session.completed':
//             const paymentIntent1 = event.data.object;
//             console.log(`PaymentIntent for Checkout ${paymentIntent1.amount} was successful!`);
           
//             break
//       default:
//         // Unexpected event type
//         console.log(`Unhandled event type ${event.type}.`);
//     }
  
//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   });
  
app.listen(PORT , () => {
    console.log(`Server is running on PORT: ${PORT}` )
})
