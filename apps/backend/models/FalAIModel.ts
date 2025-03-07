import { response } from "express";
import { BaseModel } from "./BaseModel";
import { fal } from "@fal-ai/client";

export class FalAIModel {
    constructor() {
    }

    public async  generateImage(prompt: string,tensorPath: string){
        const  { request_id, response_url }  = await fal.queue.submit("fal-ai/flux-lora", {
            input: {
              prompt: prompt,
              loras: [{path: tensorPath, scale: 1}]
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/image`,
            
        })
        console.log("Response URL of created image: ", response_url)
        return  { request_id, response_url } 
    }

    public async trainImages(zipUrl: string, triggerWord: string){
        // const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
        //     input: {
        //       images_data_url: zipUrl,
        //       trigger_word: triggerWord
        //     },
        //     webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/train`,

        //   });
        const request_id="123"
        const response_url="123"

          return {request_id, response_url}
         
    }
    public async generateImageSync(tensorPath: string){
        const response=await fal.subscribe("flux-ai/flux-lora",{
            input: {
                prompt: "Generate a head shot for this user in front of a background.",
                loras: [{path: tensorPath, scale: 1}]
            },
           
        })
        console.log(response)
        return {
            imageUrl:   response.data.images[0].url
        }
    }


}