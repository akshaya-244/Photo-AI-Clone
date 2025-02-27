import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { PacksClient } from "./PacksClient";

interface Tpack {
  id: string;
  imageUrl1: string;
  imageUrl2: string;
  name: string;
  description: string;
}

async function getPacks(): Promise<Tpack[]> {
  const res = await axios.get(`${BACKEND_URL}/pack/bulk`);

  console.log(res.data.packs);
  return res.data.packs ?? [];
}
export async function Packs() {
  const packs = await getPacks();
    return <PacksClient packs={packs} />

  
  
}
