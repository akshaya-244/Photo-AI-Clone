"use client";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { PacksClient } from "./PacksClient";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Tpack {
  id: string;
  imageUrl1: string;
  imageUrl2: string;
  name: string;
  description: string;
}

export function Packs() {
  const [packs, setPacks] = useState<Tpack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPacks() {
      try {
        const res = await axios.get(`${BACKEND_URL}/pack/bulk`);
        console.log(res.data.packs);
        setPacks(res.data.packs);
      } catch (error) {
        console.error("Failed to fetch packs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getPacks();
  }, []);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-4 p-4 grids-cols-1">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return <PacksClient packs={packs} />;
}
