import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import { Button } from './ui/button'
export default function Appbar() {
    return <div className='flex justify-between p-4 border-b text-xl'>
        <div>
            PhotoAI

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