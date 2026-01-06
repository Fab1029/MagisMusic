import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface MenuItem {
  label: string
  shortcut?: string
  disabled?: boolean
  subItems?: MenuItem[]
  onClick?: () => void | Promise<void> 
}

interface CustomDropdownMenuProps {
  trigger: ReactNode 
  menuItems: MenuItem[]
  menuWidth?: string 
}

export function CustomDropdownMenu({ trigger, menuItems, menuWidth = "w-56" }: CustomDropdownMenuProps) {
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
          <DropdownMenuItem 
            key={index} 
            disabled={item.disabled}
            onClick={item.onClick}
          >
            {item.label}
            {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
          </DropdownMenuItem>
        )
      }
    })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={menuWidth} align="start">
        <DropdownMenuGroup>{renderMenuItems(menuItems)}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
