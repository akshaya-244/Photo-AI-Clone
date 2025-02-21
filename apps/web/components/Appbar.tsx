"use client"
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
export default function Appbar() {

  const router=useRouter()
    return <div className='flex justify-between p-4 border-b text-xl'>
        <div>
          <Button variant={"outline"} onClick={() => {
            router.push('/')
          }}>
            PhotoAI
            </Button>
        </div>
        <div>
        <SignedOut>
            <SignInButton />

          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        
    </div>
}
