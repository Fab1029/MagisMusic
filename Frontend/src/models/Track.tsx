import { CustomDropdownMenu } from "@/components/CustomDropdownMenu";
import { Button } from "@/components/ui/button";
import icons from "@/constants/icons";
import type { ColumnDef } from "@tanstack/react-table";
import { Timer } from "lucide-react";

export interface Track {
  id: string;
  title: string;
  album?: string;
  artist: string;
  duration: string;
  image:string;
  preview:string;
}
