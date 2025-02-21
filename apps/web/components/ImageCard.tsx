"use client";
import Image from "next/image";

export interface TImage{
    id: string,
    imageURL: string,
    modelId: string,
    userId: string
    
}


export function ImageCard(props: TImage) {
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {/* <div className="text-white">{props.imageURL}</div> */}
        <Image
          width={500}
          height={500}
          src={props.imageURL}
          alt="Sunset in the mountains"
        />
      </div>
    </div>
  );
}
