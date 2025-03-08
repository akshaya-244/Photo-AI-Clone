"use client";
import {  useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { AlertDialogDemo } from "./Popup";
import { SelectedModels } from "./SelectedModel";
import { useStripe } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { headers } from "next/headers";




export function GenerateImage() {
 

  
  const [prompt, setPrompt]= useState("")
  const [open, setOpen]=useState(false)
  const [selectedModel, setselectedModel]= useState<string>("");
  const { getToken } = useAuth();

 const router=useRouter()

  const generateImageFunc = async() => {
   
    const token = await getToken();
    const user= await axios.get(`${BACKEND_URL}/users`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(userAmount)
    if(user.data.user.credits < 1){
      router.push("/pricing")
    }
    else{
      const decCredits=await axios.put(`${BACKEND_URL}/users`, {
        credits: Number(user.data.user.credits) - 1
      },{
        headers: {
          Authorization: `Bearer ${token}`
        },
        
        
      })
      const res=await axios.post(`${BACKEND_URL}/ai/generate`, {
      modelId: selectedModel,
      prompt: prompt,
      num: 1
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }})
      setOpen(true)
      // console.log(res)
      setPrompt("")
      toast("Image Generated!!! Please check your image in the Camera section")
    }
    
  }
  
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div>
        <SelectedModels selectedModel={selectedModel} setselectedModel={setselectedModel}/>
     
        <Textarea
          className="w-2xl h-25 py-4 my-2 border mt-4 border-blue-200 hover:border-blue-300"
          placeholder="Type your prompt here."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="text-slate-400">
        Your request will cost $0.05 per megapixel.

          That will be 1 credit
        </div>
        <div className="flex justify-center py-4">

          <Button className="py-6 text-lg" variant={"secondary"} onClick={generateImageFunc} >
            Generate an Image
          </Button>
        
        </div>
        
      </div>
    </div>
  );
}
