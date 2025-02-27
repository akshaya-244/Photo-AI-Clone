"use client"

import { useState } from "react"
import { PackCard, Tpack } from "./PackCard";
import { SelectedModels } from "./SelectedModel";

export function PacksClient({packs}: {
    packs: Tpack[]
}) {
    const [selectedModelId, setSelectedModelId]=useState<string>();
    return <div>
        <div className="py-4" >
        <SelectedModels setselectedModel={setSelectedModelId} />

        </div>
        <div className="font-bold flex justify-center text-2xl pb-2">
    Select a Pack
  </div>
        <div className="grid md:grid-cols-3 gap-4 p-4 grids-cols-1">
        {packs.map(p => <PackCard key={p.id} {...p} selectedModelId={selectedModelId!}  />)}

        </div>
    </div>
}