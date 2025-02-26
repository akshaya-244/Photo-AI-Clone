"use client";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageCard, TImage } from "./ImageCard";
import { Skeleton } from "./ui/skeleton";

export function Camera() {
  const [images, setImages] = useState<TImage[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true)
  const { getToken } = useAuth();
  useEffect(() => {
    (async () => {
      const token = await getToken();
      const response = await axios.get(`${BACKEND_URL}/image/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.data.images.length === 0)
        setImages([])
      else
        setImages(response.data.images);
      setImagesLoading(false)
    })();
  }, []);

  return images.length === 0 ? (
    <div className="w-full border-2 h-50 mt-10 ">
      <div className="flex justify-between px-4 py-4">
        <div className="text-sm md:text-md lg:text-xl ">Your Gallery</div>
        <div className="text-gray-400 ">0 images</div>
      </div>

      <div className="flex flex-col mt-10 items-center">
          No images yet. Start by generating some!
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {imagesLoading && <Skeleton className="py-20 w-95 h-72"/>}
      {imagesLoading && <Skeleton className="py-20 w-95 h-72"/>}
      {imagesLoading && <Skeleton className="py-20 w-95 h-72"/>}
      {imagesLoading && <Skeleton className="py-20 w-95 h-72"/>}
      
      {images.map((p) => (
        <ImageCard key={p.id} {...p} />
      ))}
      {images.map((p) => (
        <ImageCard key={p.id} {...p} />
      ))}
      {images.map((p) => (
        <ImageCard key={p.id} {...p} />
      ))}
      {images.map((p) => (
        <ImageCard key={p.id} {...p} />
      ))}
    </div>
  );
}
