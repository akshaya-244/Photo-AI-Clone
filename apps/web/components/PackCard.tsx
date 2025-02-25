"use client";
import Image from "next/image";

export interface Tpack {
  id: string;
  imageUrl1: string;
  imageUrl2: string;
  name: string;
  description: string;
}
export function PackCard(props: Tpack) {
  return (
    <div className="hover:border-red-300 rounded-xl border-2 cursor-pointer">
      <div className="flex  rounded overflow-hidden shadow-lg ">
        <Image src={props.imageUrl1} width={200} height={500} className="rounded" alt="FF" />
        <Image src={props.imageUrl2} width={200} height={500} className="rounded" alt="FF" />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.name}</div>
        <p className="text-white text-base">{props.description}</p>
      </div>
    </div>
  );
}
