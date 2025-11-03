import { ReactNode } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface CustomTooltipProps {
  infoHover: string,
  trigger: ReactNode 
}

export function CustomTooltip({infoHover, trigger} : CustomTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {trigger}
      </TooltipTrigger>
      <TooltipContent>
        <p>{infoHover}</p>
      </TooltipContent>
    </Tooltip>
  )
}
