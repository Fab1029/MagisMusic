import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Check, Copy, Send } from "lucide-react"

interface ShareDialogProps {
  isOpen: boolean;
  url: string;
  setIsOpen: (value: boolean) => void;
  
}

function ShareDialog({ isOpen, setIsOpen, url }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(url);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const whatsappURL = isMobile
      ? `whatsapp://send?text=${text}` 
      : `https://web.whatsapp.com/send?text=${text}` 

    window.open(whatsappURL, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-card text-foreground p-6 rounded-2xl max-w-md w-full">

        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Compartir Jam
          </DialogTitle>

          <DialogDescription className="text-sm text-secondary">
            Copia el URL para compartir tu Jam o envíalo directamente por WhatsApp.
          </DialogDescription>
        </DialogHeader>

        {/* Boton para copiar*/}
        <div className="flex flex-col gap-2 w-full mt-4">
          <div className="flex items-center gap-2 w-full">
            <p
              className="flex-1 text-sm p-2 bg-muted rounded-xl select-all break-all"
            >
              {url}
            </p>

            <Button
              variant="pillHoverSecondary"
              className="p-2 rounded-xl active:scale-95"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Pulsa el ícono para copiar el enlace
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
          
          <Button
            variant="play"
            className="w-full rounded-xl flex items-center gap-2 hover:scale-105 transition"
            onClick={handleWhatsAppShare}
          >
            <Send className="h-4 w-4" />
            Compartir por WhatsApp
          </Button>
          
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default ShareDialog
