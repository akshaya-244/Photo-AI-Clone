"use client";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

export interface TImage{
    id: string,
    imageURL: string,
    modelId: string,
    userId: string
    status: string
}


export function ImageCard(props: TImage) {
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {/* <div className="text-white">{props.imageURL}</div> */}
       
        {/* {props.status == "Generated" ?  */}
        <Image
          width={500}
          height={500}
          src={props.imageURL}
          alt="Sunset in the mountains"
        /> 
        {/* : <Skeleton className="h-60 w-90cd"/>} */}
      </div>
    </div>
  );
}
