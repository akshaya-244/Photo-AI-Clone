"use client"
import convertToSubcurrency from "@/app/lib/convertToSubcurrency"
import {Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutPage from "./CheckoutPage"
import { useAuth, useSession } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import Link from "next/link"
import { User } from "@clerk/nextjs/server"
import axios from "axios"
import { BACKEND_URL } from "@/app/config"

const stripePromise = loadStripe("pk_test_51QwaTVK5Pp5ZCojp8SVsDy0hgLvWfwdoUuoQUN8HquYFwystygIafb2ruskUOn0YNdUTEpzh4xIDvpEMky40mXpf00hZoLSMj8" )  
export const plans=[
    {
        link: process.env.NODE_ENV==="development" ? "https://buy.stripe.com/test_eVa5nUfcIdRN6Zy3cc": '',
        priceId: process.env.NODE_ENV === "development" ? 'prod_RrHOo45aUYZDXG' : '',
        price: 5,


    }
]
export default function StripeInt(){
    // const {data: session}=useSession();
    const [plan, setPlan]=useState(plans[0])
    const { getToken } = useAuth();
    const [user, setUser] = useState<User>();
    const [loading, setIsLoading]=useState(false)

    useEffect(() => {
        const getUser = async () => {
          const token = await getToken();
          if (token) {
            const res = await axios.get(`${BACKEND_URL}/user`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            setIsLoading(true);
            setUser(res.data.user);
          }
        };
    
        getUser();
      }, []);
    
    return <div>
        <div className="space-y-2">
            <Link 
            className="btn btn-primary btn-block text-lg"
            target="_blank"
            href={plan?.link!}>Pay</Link>
        </div>
    </div>
}