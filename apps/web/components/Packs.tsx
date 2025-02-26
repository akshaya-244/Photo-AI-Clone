import axios from "axios";
import { PackCard } from "./PackCard";
import { BACKEND_URL } from "@/app/config";

interface Tpack {
  id: string;
  imageUrl1: string;
  imageUrl2: string;
  name: string;
  description: string;
}

async function getPacks(): Promise<Tpack[]> {
  const res = await axios.get(`${BACKEND_URL}/pack/bulk`);

  console.log(res.data.packs)
  return res.data.packs ?? [];
}
export async function Packs() {

  const packs = await getPacks();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {packs.map((p) => (
        <PackCard key={p.id} {...p} />
      ))}
    </div>
  );
}
