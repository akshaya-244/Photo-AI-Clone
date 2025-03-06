"use client"
import * as React from "react";
import {  useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";

interface PriceInt {
  name: string;
  credits: number;
  price: string;
  description: string;
  border: boolean;
}
export const plans = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_eVa5nUfcIdRN6Zy3cc"
        : "https://buy.stripe.com/test_aEU9Ea3u0dRNbfOeUV",
    priceId:
      process.env.NODE_ENV === "development" ? "prod_RrHOo45aUYZDXG" : "",
    price: 5,
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_aEU9Ea3u0dRNbfOeUV"
        : "https://buy.stripe.com/test_aEU9Ea3u0dRNbfOeUV",
    priceId:
      process.env.NODE_ENV === "development" ? "prod_RsXi5NmE9Rh6y8" : "prod_RsXi5NmE9Rh6y8",
    price: 10,
  },
];
export  default function Pricing({
  name,
  credits,
  price,
  description,
  border,
}: PriceInt) {
    const [plan, setPlan]=useState(plans[0])
    const [user, setUser]=useState({email: ""})
    const [loading, setLoading]=useState(false)
    const {getToken} = useAuth()
    useEffect(() => {
        (async () => {
            const token=await getToken()
            if(token){
                const res=await axios.get(`${BACKEND_URL}/users`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setLoading(true);
                setUser(res.data.user)
            console.log("Get user: ",  res.data)

            }
           
        })()
    },[])


  return (
    <div>
      <Card className={`w-[250px] ${border ? "border-purple-600" : ""} `}>
        <CardHeader>
          <CardTitle className="font-bold">{name} Plan</CardTitle>
          <CardDescription>
            One-time payment for {credits} credits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className=" justify-center grid w-full items-center gap-4">
              <div className="flex">
                <div className="font-bold text-purple-700 text-5xl">
                  ${price}
                </div>
                <div className="text-slate-400 text-sm mt-7 px-2">one time</div>
              </div>
              <div>{description}</div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link className="bg-amber-50 text-black font-bold rounded-xl px-8 py-4" href={plan?.link+ '?prefilled_email='+  user.email}>Get {credits} credits</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
