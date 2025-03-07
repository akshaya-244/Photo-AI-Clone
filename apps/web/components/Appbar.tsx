"use client"
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useAuth
  } from '@clerk/nextjs'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '@/app/config'
export default function Appbar() {
  const {getToken} =useAuth()
  const token= getToken()
  const [credits, setCredits] = useState(0)
  useEffect(() => {
    const getUser = async() => {
      const user=await axios.get(`${BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
       
      }) 
      console.log(user)
      setCredits(user.data.credits)
    }
    getUser()
  })
  const router=useRouter()
    return <div className='flex justify-between p-4 border-b text-xl'>
        <div>
          <Button variant={"outline"} onClick={() => {
            router.push('/')
          }}>
            PhotoAI
            </Button>
        </div>
        <div >
          <SignedOut>
            <SignInButton />

          </SignedOut>
          <SignedIn>
            <div className='flex gap-4'>
            <div>
              Credits:{credits}
            </div>
            <div>
              <UserButton />

            </div>
           
            </div>
           
          </SignedIn>
          
       
        </div>
        
    </div>
}
