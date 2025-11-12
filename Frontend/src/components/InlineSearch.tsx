import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import icons from "@/constants/icons";

export function InlineSearch() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div className="flex items-center gap-1">
      <Button 
        variant="pill" 
        className="bg-card p-2 rounded-full"
        onClick={() => setOpen((prev) => !prev)}>
        <img className="w-5 h-5" src={icons.searchIcon} alt="Opciones" />
      </Button>

      <input
        ref={inputRef}
        type="text"
        placeholder="Busca en tu biblioteca"
        className={`transition-all duration-300 ease-in-out bg-input rounded-md px-3 py-1 outline-none text-sm
        ${open ? "w-full max-w-[12rem] opacity-100" : "w-0 opacity-0 p-0"}
        md:w-50 
        `}
      />
    </div>
  );
}