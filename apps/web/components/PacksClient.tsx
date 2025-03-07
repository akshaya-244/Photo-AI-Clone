"use client";

import { useState } from "react";
import { PackCard, Tpack } from "./PackCard";
import { SelectedModels } from "./SelectedModel";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function PacksClient({ packs }: { packs: Tpack[] }) {
  const { getToken } = useAuth();
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const [packId, setPackId] = useState<string>(packs[0]?.id || "");
  const router=useRouter()
  return (
    <div>
      <div className="py-4">
        <SelectedModels
          selectedModel={selectedModelId}
          setselectedModel={setSelectedModelId}
        />
      </div>
      <div className="font-bold flex justify-center text-2xl pb-2">
        Select a Pack
      </div>
      <div className="grid md:grid-cols-3 gap-4 p-4 grids-cols-1">
        {packs.map((p) => (
          <PackCard
            key={p.id}
            packId={packId}
            setPackId={setPackId}
            {...p}
            selectedModelId={selectedModelId!}
          />
        ))}
      </div>

      <Button className="px-2 "
        onClick={async () => {
          const token = await getToken();
          const userAmount=await axios.get(`${BACKEND_URL}/users`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          if(userAmount.data.user.credits <=0 ){
            router.push('/pricing')
          }
          else{
            await axios.post(
              `${BACKEND_URL}/pack/generate`,
              {
                modelId: selectedModelId,
                packId: packId,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
  
            toast("Image Generated!!! Please check your image in the Camera section");
          }
          
        }}
      >
        Generate
      </Button>
    </div>
  );
}
