"use client"
import { GenerateImage } from "@/components/GenerateImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainDash from "@/components/TrainDash";
import { Packs } from "@/components/Packs";

export default function Dashboard() {
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="account" className="w-[1200px] py-4 ">
        <TabsList className="grid w-full grid-cols-3 ">
          <TabsTrigger value="generate">Generate an image</TabsTrigger>
          <TabsTrigger value="train">Train a model</TabsTrigger>
          <TabsTrigger value="packs">Packs</TabsTrigger>
        </TabsList>
        

        <TabsContent value="generate"><GenerateImage /></TabsContent>
        <TabsContent value="train"><TrainDash /></TabsContent>
        <TabsContent value="packs"><Packs /></TabsContent>

      </Tabs>
    </div>
  );
}
