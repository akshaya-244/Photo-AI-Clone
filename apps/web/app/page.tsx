import Image, { type ImageProps } from "next/image";
import { Button } from "@/components/ui/button";
import styles from "./page.module.css";



export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
    <Button>Click me</Button>
      
    </h1>
  );
}
