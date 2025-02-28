"use client"
import { BACKEND_URL } from "@/app/config"
import convertToSubcurrency from "@/app/lib/convertToSubcurrency"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

const CheckoutPage = ({amount} : {amount: number}) => {
    const stripe =useStripe()
    const elements=useElements()

    const [errorMessage, setErrorMessage]=useState<string>()
    const [clientSecret, setClientSecret]=useState("")
    const [loading, setLoading]=useState(false)

    useEffect(() => {
        (async () => {
            const finalAmount = Number(convertToSubcurrency(amount)); // Ensure it's a number
            const res= await axios.post(`${BACKEND_URL}/create-payment-intent`, {
                amount: finalAmount
            }, {
                headers: {
                    "Content-Type" : "application/json"
                },
               
            })
           
            console.log(res)
            setClientSecret(res.data.clientSecret)
        })()
        
    }, [amount])

    const handleSubmit= async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        if(!stripe || !elements){
            return;
        }

        const {error: submitError} = await elements.submit()
        if(submitError){
            setErrorMessage(submitError.message)
            setLoading(false)
            return
        }

        const {error} =await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams:{
                return_url:  `http://localhost:3000/payment-success?amount=${amount}`,
            },
        })

        if(error){
            setErrorMessage(error.message)
        }
        setLoading(false)
        if(!clientSecret || !stripe || !elements){
            return (
                <div className="flex items-center justify-center">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>)
        }

    }
    return <form onSubmit={handleSubmit} className=" p-2 rounded-md">
        {/* {console.log(clientSecret)} */}
        <div>
            Client secret {clientSecret}
        </div>
        {clientSecret && <PaymentElement />}
        {errorMessage && <div>{errorMessage}</div>}
        <button disabled={!stripe || loading}>{!loading ? `Pay $${amount}`: "Processing..."}</button>
    </form>

}
export default CheckoutPage