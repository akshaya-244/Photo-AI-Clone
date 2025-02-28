"use client"
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Hero() {
  const images = [
    "https://v3.fal.media/files/kangaroo/f6ka_z_Ex647ZxBVqCsn5_59156c33141244c6958be32d113d5250.jpg",
    "https://v3.fal.media/files/tiger/vzAnua0GnFpxo4zBayldD_acb8dce5a96d47899f2d1572c5064d04.jpg",
    "https://v3.fal.media/files/rabbit/i0uxtAFcEfkxeEXraOTTo_f9f7cd702a22437983930a57f8b3e44b.jpg",
    "https://v3.fal.media/files/koala/hLTf7P46s9ABCleZ07MZN_cc11e5bf29b549249eaba49a2a297616.jpg",
    "https://v3.fal.media/files/koala/hLTf7P46s9ABCleZ07MZN_cc11e5bf29b549249eaba49a2a297616.jpg",
    "https://v3.fal.media/files/koala/hLTf7P46s9ABCleZ07MZN_cc11e5bf29b549249eaba49a2a297616.jpg",


  ];
  const router=useRouter()
  return (
    <div className="flex justify-center">
      <div className="lg:max-w-[900px] md:max-w-[700px] max-w-[400px]">
        <h1 className="text-bold lg:text-4xl md:text-4xl text-xl text-center py-15">
          Capture special moments with your friends <br></br>and family in
          creative visuals.
        </h1>
        <Carousel
          opts={{
            align: "start",
          }}
          className="lg:min-w-xl min-w-sm "
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/4">
                <div className="px-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        width={100}
                        height={100}
                        unoptimized
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
            <div className="flex justify-center ">
              <SignedIn>
                <Button   onClick={() => {
                  router.push('/dashboard')
                }} className="min-w-sm md:min-w-md lg:min-w-xl py-10 mt-6 text-xl md:text-3xl lg:text-3xl" variant={"secondary"} >Dashboard</Button>

              </SignedIn>
              <SignedOut>
               
                <SignInButton>
                <Button  className="min-w-xl py-10 mt-6 text-xl  lg:text-3xl" >Sign In</Button>
                </SignInButton>

              </SignedOut>
            </div>
      </div>
    </div>
  );
}
