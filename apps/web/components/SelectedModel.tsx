import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface TModel {
    id: string;
    name: string
    thumbnail: string;
  }
export function SelectedModels({setselectedModel}: {setselectedModel: (model: string) => void}) {
    const [models, setModels] = useState<TModel[]>([]);
    //   const [selectedModel, setselectedModel] = useState<string>();
      const [modelLoading, setModelLoading]=useState(true);
      const { getToken } = useAuth();
    
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
    
  return  <div>

    <div className="text-2xl pb-2">
    Select Model
  </div>
<div className="grid grid-cols-4 gap-1">
    {models.map((model) => (
      <div
      className={`${selectedModelId == model.id ? "border-red-300" :""} cursor-pointer rounded border p-2 `}
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
    </div>

}