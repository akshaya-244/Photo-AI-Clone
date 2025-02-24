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
    "/images/ph-1.jpg",
    "/images/ph-2.jpg",
    "/images/ph-4.jpg",
    "/images/ph-5.jpg",
    "/images/ph-3.jpg",


  ];
  const router=useRouter()
  return (
    <div className="flex justify-center">
      <div className="max-w-full">
        <h1 className="text-bold lg:text-6xl md:text-4xl text-xl text-center py-15">
          Capture special moments with your friends <br></br>and family in
          creative visuals.
        </h1>
        <Carousel
          opts={{
            align: "start",
          }}
          className="min-w-xl"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        width={200} height={200}
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
            <div className="flex justify-center">
              <SignedIn>
                <Button   onClick={() => {
                  router.push('/dashboard')
                }} className="min-w-xl py-10 mt-6 text-xl md:text-3xl lg:text-4xl" variant={"secondary"} >Dashboard</Button>

              </SignedIn>
              <SignedOut>
               <Button  variant={"secondary"} className="min-w-xl py-10 mt-6 text-xl  lg:text-3xl" >
                <SignInButton />

                </Button>
              </SignedOut>
            </div>
      </div>
    </div>
  );
}
