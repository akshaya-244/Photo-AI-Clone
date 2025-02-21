"use client"
import { BACKEND_URL } from "@/app/config"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import { ImageCard, TImage } from "./ImageCard"



export function Camera () {
    const [images, setImages]=useState<TImage[]>([])
    const {getToken}=useAuth()
    useEffect(() => {
        (async() => {
            const token= await getToken()
            const response=await axios.get(`${BACKEND_URL}/image/bulk`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data.images)
            setImages(response.data.images)
        })()
    }, [])
    
    return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
            
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
        </div>)
}