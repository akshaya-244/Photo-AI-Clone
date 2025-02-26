import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  
  interface AlertInt{
    open: boolean,
    setOpen: (open: boolean) => void
  }
  export function AlertDialogDemo({open, setOpen} : AlertInt) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
       
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Model Created</AlertDialogTitle>
            <AlertDialogDescription>
              This action will take atleast 20 minutes to complete. 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  