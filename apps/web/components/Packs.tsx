"use client"
import { PackCard } from "./PackCard"

export function Packs(){
    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
    <PackCard />
    <PackCard />
    <PackCard />
    <PackCard />
    <PackCard />
    <PackCard />
    <PackCard />
    <PackCard />
  </div>
}