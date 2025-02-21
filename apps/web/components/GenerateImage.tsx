import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";

export function GenerateImage() {
    // 
    
  return (
    <div className="flex h-[60vh] items-center justify-center">
        <div>
        <div className="flex justify-center">
        <Textarea  className="w-2xl py-4 my-2 border border-blue-200 hover:border-blue-300" placeholder="Type your prompt here." />
      </div>
      <div className="flex justify-center">
        <Button  variant={"secondary"}>Generate an Image</Button>
      </div>
        </div>
     
    </div>
  );
}
