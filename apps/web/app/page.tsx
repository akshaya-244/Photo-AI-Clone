import Image, { type ImageProps } from "next/image";
import { Button } from "@/components/ui/button";
import styles from "./page.module.css";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div >
      <Hero />
    </div>
  );
}
