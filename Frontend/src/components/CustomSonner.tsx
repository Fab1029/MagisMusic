import { toast } from "sonner"

export const errorToast = (title: string, description?: string) => {
  return toast.error(title, {
    description,
    duration: 4000,
    classNames: {
      toast: "bg-card border border-destructive",
      title: "text-foreground",
      description: "text-[#FCA5A5]", 
      icon: "text-destructive",
    },
  })
}


export const infoToast = (title: string, description?: string) => {
  return toast.info(title, {
    description,
    duration: 4000,
    classNames: {
      toast: "bg-[#104e64] border border-primary",
      title: "text-[#ECEFF1]",
      description: "text-[#B3E5FC]",
      icon: "text-[#B3E5FC]",
    },
  })
}

export const successToast = (title: string, description?: string) => {
  return toast.success(title, {
    description,
    duration: 4000,
    classNames: {
      toast: "bg-card border border-primary",
      title: "text-foreground",
      description: "text-muted-foreground",
      icon: "text-primary",
    },
  })
}
