"use client";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { BACKEND_URL, CLOUDFLARE_URL, CLOUDFLARE_URL2 } from "@/app/config";

export function UploadThumbnail({onUploadDone} :{onUploadDone: (imageUrl: string) => void} ) {
    

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <FileIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />        
          <Button variant="outline" className="w-full" onClick={() => {
            const input = document.createElement("input")
            input.type = "file"
            input.accept = "image/png, image/jpeg, image/jpg"

            input.onchange = async () => {
                
                if (!input.files || input.files.length === 0) return;
                const file=input.files[0]  || NULL

                try{
                const res = await axios.get(`${BACKEND_URL}/pre-signed-url-thumbnail`)
                console.log("Thumbnail res: ",res)
                const url = res.data.url  
                const key= res.data.key
                console.log('URL: ', url)
                console.log('KEY: ',key)

                const response = await axios.put(url, file, {
                    headers: {
                      "Content-Type": file.type , // Ensure correct file type
                    }, 
                  });
                  console.log(`I know: ${CLOUDFLARE_URL2}/${key}`,)
                onUploadDone(`${CLOUDFLARE_URL2}/${key}`)
                console.log(response)
                }
                catch(e){
                    console.error("Upload error:", e);
                }
                
            }
            input.click()
          }}>Select files</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}