"use client";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { AlertDialogDemo } from "./Popup";

export interface Tpack {
  id: string;
  imageUrl1: string;
  imageUrl2: string;
  name: string;
  description: string;
}
export function PackCard(props: Tpack
   & 
   { selectedModelId: string } & {packId: string} & {setPackId: (packIdInside: string )=> void}) {
  const { getToken } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${props.id === props.packId ? 'border-red-300 rounded-xl border-2 cursor-pointer' : ''}`}
      onClick={async () => {
      
        props.setPackId(props.id)
        setOpen(true);
      }}
    >
      <div className="flex  rounded overflow-hidden shadow-lg ">
        <Image
          src={props.imageUrl1}
          width={200}
          height={500}
          className="rounded"
          alt="FF"
        />
        <Image
          src={props.imageUrl2}
          width={200}
          height={500}
          className="rounded"
          alt="FF"
        />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.name}</div>
        <p className="text-white text-base">{props.description}</p>
      </div>
      {/* <AlertDialogDemo open={open} setOpen={setOpen} title="Images generated!!!" desc="You can view your images in the camera section!"/> */}
    </div>
  );
}
