import {z} from "zod"

export const TrainModel = z.object({
    name: z.string(),
    type: z.enum([ "man", "woman", "other"]),
    age: z.number(),
    ethnicity: z.enum(["white", "black", "asian_american", "south_east_asian", "east_asian", "south_asian", "middle_eastern", "pacific", "hispanic" ]),
    eyeColor: z.enum([ "brown", "blue", "hazel", "gray", "black"]),
    bald: z.boolean(),
    thumbnail: z.string(),
    zipUrl: z.string(),
  });
export const GenerateImage= z.object({
    modelId: z.string(),
    prompt: z.string(),
    num: z.number()
})

export const GenerateImagesFromPack = z.object({
    modelId: z.string(),
    packId: z.string()
})