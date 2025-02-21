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
        <img src={props.imageUrl1} width="50%" className="rounded" alt="FF" />
        <img src={props.imageUrl2} width="50%" className="rounded" alt="FF" />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.name}</div>
        <p className="text-white text-base">{props.description}</p>
      </div>
    </div>
  );
}
