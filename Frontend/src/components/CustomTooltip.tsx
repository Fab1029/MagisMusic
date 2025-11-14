import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ReactNode } from "react"

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
