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
        <Pricing name="Basic" credits="500" price="50" description="Basic support" border={false}/>
        <Pricing name="Premium" credits="1000" price="100" description="Premium support" border={true}/>

        </div>
        
        
    </div>
}