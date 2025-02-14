import {z} from "zod"

export const TrainModel= z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Other"]),
    age: z.number(),
    ethnicity: z.enum(["White", "Black","Asian_American", "South_East_Asian", "East_Asian", "South_Asian", "Middle_Eastern", "Pacific","Hispanic"]),
    eyeColor: z.enum(["Brown", "Blue", "Hazel","Gray","Black"]),
    bald: z.boolean(),
    userId: z.string(),
    images: z.array(z.string())


})

export const GenerateImage= z.object({
    modelId: z.string(),
    prompt: z.string(),
    num: z.number()
})

export const GenerateImagesFromPack = z.object({
    modelId: z.string(),
    packId: z.string()
})