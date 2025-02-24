
import { GenerateImage } from "@/components/GenerateImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainDash from "@/components/TrainDash";
import { Packs } from "@/components/Packs";
import { Camera } from "@/components/Camera";

export default function Dashboard() {
  return (
    <div className="flex justify-center">
      <Tabs  defaultValue="camera" className="lg:w-[1200px] md:w-[800px] w-[475px] py-4 ">
        <TabsList  className="grid w-full grid-cols-4 ">
          <TabsTrigger  value="camera">Camera</TabsTrigger>
          <TabsTrigger value="generate">Generate an image</TabsTrigger>
          <TabsTrigger value="train">Train a model</TabsTrigger>
          <TabsTrigger value="packs">Packs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="camera"><Camera /></TabsContent>
        <TabsContent value="generate"><GenerateImage /></TabsContent>
        <TabsContent value="train"><TrainDash /></TabsContent>
        <TabsContent value="packs"><Packs /></TabsContent>

      </Tabs>
    </div>
  );
}
