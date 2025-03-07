"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { UploadModal } from "@/components/ui/upload";
import React, { useState } from "react";
import {TrainModelInput} from "@repo/common/inferred_types"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { BACKEND_URL } from "@/app/config";
import { GenerateImage } from "./GenerateImage";
import { AlertDialogDemo } from "./Popup";
import { toast } from "sonner";

export default function TrainDash() {

  enum ModelType {
    Man = "man",
    Woman = "woman",
    Other = "other"
  }

  
  enum Ethnicity {
    White = "white",
    Black = "black",
    Asian_American = "asian_american",
    South_East_Asian = "south_east_asian",
    East_Asian = "east_asian",
    South_Asian = "south_asian",
    Middle_Eastern = "middle_eastern",
    Pacific = "pacific",
    Hispanic = "hispanic"
  }
  
  enum EyeColor {
    Brown = "brown",
    Blue = "blue",
    Hazel = "hazel",
    Gray = "gray",
    Black = "black"
  }

  const [zipUrl, setZipUrl] = useState("");
  const [open, setOpen] = useState(false)
  const [name, setName]=useState("")
  const [age, setAge]=useState(0)
  const [ethnicity, setEthnicity] = React.useState<Ethnicity | "">(""); 
  const [type, setType] = React.useState<ModelType | "">(""); 
  const [bald, setBald]=useState(false)
  const [eyeColor, setEyeColor]=React.useState<EyeColor | "">("");
  const router=useRouter();
  const {getToken}=useAuth();

  const trainModelFunc = async() => {
    const input : TrainModelInput={
      name,
      type: type as ModelType,
      age,
      ethnicity: ethnicity as Ethnicity,
      eyeColor: eyeColor as EyeColor,
      bald,
      zipUrl,
      
    }

    const token=await getToken()
    const userAmount=await axios.get(`${BACKEND_URL}/users`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    if(userAmount.data.user.credits <= 50){
      router.push('/pricing')
    }

    else{

      console.log("Not working")
      await axios.put(`${BACKEND_URL}/users`,{
        credits: userAmount.data.user.credits - 50
      },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      // const response=await axios.post(`${BACKEND_URL}/ai/training`, input,{
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // })
      toast("This task will take aprroximately 20 mins to complete. Thank you for your patience.")
      // console.log("Response: ",response)
      setOpen(true)
    }
 
  }

  return (
    <div className="flex  justify-center py-14">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Train New Model</CardTitle>
          <CardDescription>
            Create a custom AI model with your images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 w-full items-center gap-4">
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your model" onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label  htmlFor="framework">Type</Label>
              <Select onValueChange={(value) => setType(value as ModelType)}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="man">Man</SelectItem>
                  <SelectItem value="woman">Woman</SelectItem>
                 <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Age</Label>
              <Input id="number" onChange={e => setAge(Number(e.target.value))} placeholder="Age" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Eye color</Label>
              <Select onValueChange={(value) => setEyeColor(value as EyeColor)}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="brown">Brown</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="hazel">Hazel</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Ethnicity</Label>
              <Select onValueChange={(value) => setEthnicity(value as Ethnicity)}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="white">Brown</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="asian_american">Asian American</SelectItem>
                  <SelectItem value="south_east_asian">
                    South East Asian
                  </SelectItem>
                  <SelectItem value="east_asian">East Asian</SelectItem>
                  <SelectItem value="south_asian">South Asian</SelectItem>
                  <SelectItem value="middle_eastern">Middle Eastern</SelectItem>
                  <SelectItem value="pacific">Pacific</SelectItem>
                  <SelectItem value="hispanic">Hispanic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="bald" checked={bald} onCheckedChange={(checked) => setBald(checked)} />
              <Label htmlFor="bald">Bald</Label>
            </div>

            
           

           
          </div>
          <div className="grid grid-cols-1  items-center py-10">

          <div className="flex flex-col  space-y-2">
            <Label htmlFor="framework">Photos</Label>
            <UploadModal onUploadDone={(zipUrl) => {
              setZipUrl(zipUrl)
            }}/>
            </div>
            </div>
            <div className="text-sm">
            Your request will cost $2.5 per training run (scales linearly with steps). That will be 50 credits
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/')}>Cancel</Button>
          <Button disabled={!zipUrl || !name || !type || !ethnicity || !eyeColor || !age } onClick={trainModelFunc}>Create Model</Button>
          {/* <AlertDialogDemo open={open} setOpen={setOpen} title="Model Created" desc="This task will take aprroximately 20 mins to complete. Thank you for your patience."/> */}
            
        </CardFooter>
      </Card>
    </div>
  );
}
// 