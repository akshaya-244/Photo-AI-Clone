import Pricing from "@/components/ui/Pricing";

export default function PricingApp() {
    return <div className="flex flex-col items-center py-10"> 
        <div className="font-bold">
            Choose your plan
        </div>

        <div className="text-slate-400 py-2">
            Find the perfect plan for your needs. Every plan includes access to our core features.
        </div>
        <div className="flex gap-x-8">
        <Pricing name="Basic" credits={100} price="5" description="Basic support" border={false} credit5={0}/>
        <Pricing name="Premium" credits={200} price="10" description="Premium support" border={true} credit5={1}/>

        </div>
        
        
    </div>
}