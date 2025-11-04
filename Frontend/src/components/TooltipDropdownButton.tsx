import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import type { ReactNode } from "react"

interface MenuItem {
  label: string
  shortcut?: string
  disabled?: boolean
  subItems?: MenuItem[]
}

interface TooltipDropdownButtonProps {
  trigger: ReactNode
  infoHover: string
  menuItems: MenuItem[]
  menuWidth?: string
}

export function TooltipDropdownButton({
  trigger,
  infoHover,
  menuItems,
  menuWidth = "w-56",
}: TooltipDropdownButtonProps) {
  const renderMenuItems = (items: MenuItem[]) =>
    items.map((item, index) => {
      if (item.subItems && item.subItems.length > 0) {
        return (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {renderMenuItems(item.subItems)}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )
      } else {
        return (
          <DropdownMenuItem key={index} disabled={item.disabled}>
            {item.label}
            {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
          </DropdownMenuItem>
        )
      }
    })

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            {trigger}
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{infoHover}</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent className={menuWidth} align="start">
        <DropdownMenuGroup>{renderMenuItems(menuItems)}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
