
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Images</CardTitle>
        <CardDescription>Drag and drop your images or select files from your computer</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="border-dashed border-2 border-gray-200 rounded-lg w-full h-[200px] flex items-center justify-center transition-colors border-gray-300 border-dashed dark:border-gray-700 hover:border-gray-400 hover:border-gray-400">
          <UploadIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 text-sm dark:text-gray-400">Drag and drop your files here</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <Button variant="ghost" size="icon" className="absolute top-0 right-0 translate-x-1/2 group-hover:visible">
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove</span>
            </Button>
            <img
              src="/placeholder.svg"
              width="150"
              height="100"
              alt="Thumbnail"
              className="aspect-16/9 rounded-md object-cover overflow-hidden border"
            />
          </div>
          <div className="relative group">
            <Button variant="ghost" size="icon" className="absolute top-0 right-0 translate-x-1/2 group-hover:visible">
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove</span>
            </Button>
            <img
              src="/placeholder.svg"
              width="150"
              height="100"
              alt="Thumbnail"
              className="aspect-16/9 rounded-md object-cover overflow-hidden border"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Button variant="outline" className="ml-auto">
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}