"use client"
import convertToSubcurrency from "@/app/lib/convertToSubcurrency"
import {Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutPage from "./CheckoutPage"

const stripePromise = loadStripe("pk_test_51QwaTVK5Pp5ZCojp8SVsDy0hgLvWfwdoUuoQUN8HquYFwystygIafb2ruskUOn0YNdUTEpzh4xIDvpEMky40mXpf00hZoLSMj8" )  
export default function StripeInt(){
    const amount=10.90

    return <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
            <h1 className="text-4xl font-extrabold mb-2">
                Akshaya has requested
            </h1>
            <span className="font-bold"> ${amount}</span>
        </div>

        <Elements stripe={stripePromise}
        options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency:"usd",
        }}
        >
            <CheckoutPage amount={amount} />
        </Elements>
         
    </main>
}