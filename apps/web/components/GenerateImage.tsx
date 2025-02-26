"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { AlertDialogDemo } from "./Popup";

interface TModel {
  id: string;
  name: string
  thumbnail: string;
}
export function GenerateImage() {
  const [models, setModels] = useState<TModel[]>([]);
  const [selectedModel, setselectedModel] = useState<string>();
  const [modelLoading, setModelLoading]=useState(true);
  const [prompt, setPrompt]= useState("")
  const [open, setOpen]=useState(false)
  const { getToken } = useAuth();

  const generateImageFunc = async() => {
    const token = await getToken();
    const res=await axios.post(`${BACKEND_URL}/ai/generate`, {
      modelId: selectedModel,
      prompt: prompt,
      num: 1
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }})
      setOpen(true)
      console.log(res)
      setPrompt("")
  }
  useEffect(() => {
    (async () => {
      const token = await getToken();
      const response = await axios.get(`${BACKEND_URL}/models`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.data.models.length === 0)
      {
        setModels([])
        setselectedModel("")
        setModelLoading(false)
      } 
      else{

        setModels(response.data.models);
      setselectedModel(response.data.models[0]?.id);
      setModelLoading(false)
      }
      
    })();
  }, []);

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div>
        <div className="text-2xl pb-2">
          Select Model
        </div>
      <div className="grid grid-cols-4 gap-1">
          {models.map((model) => (
            <div
            className={`${selectedModel == model.id ? "border-red-300" :""} cursor-pointer rounded border p-2 `}
              key={model.id}
              onClick={() => {
                console.log(models);
                setselectedModel(model.id);
              }}
            >
              <div className="relative w-full h-auto aspect-[5/4]">
              <Image
               fill
               className="rounded-md object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
                alt="Temp"
                src={model.thumbnail}
              />
              </div>
              
              <div>{model.name}</div>
            </div>
          ))}
          {
            modelLoading && <div className="grid grid-cols-4 gap-2 p-4">
              <Skeleton className="h-40 w-full rounded-full" />
              <Skeleton className="h-40 w-full rounded-full" />
              {/* <Skeleton className="h-40 w-full rounded-full" />
              <Skeleton className="h-40 w-full rounded-full" /> */}

            </div>
          }
        </div>
        <Textarea
          className="w-2xl h-25 py-4 my-2 border border-blue-200 hover:border-blue-300"
          placeholder="Type your prompt here."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex justify-center py-4">
          <Button className="py-6 text-lg" variant={"secondary"} onClick={generateImageFunc} >
            Generate an Image
          </Button>
         <AlertDialogDemo open={open} setOpen={setOpen} title="Image Created Successfully!!!" desc="Please check the generated image in the Camera section"/>
         
        </div>
        
      </div>
    </div>
  );
}
