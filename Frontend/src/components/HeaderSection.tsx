import { Button } from "./ui/button";

interface HeaderSectionProps {
  title: string;
  onClick?: () => void;
}

function HeaderSection({title, onClick}: HeaderSectionProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-2xl">
        {title}
      </h1>
      <Button
        variant='header'
        onClick={onClick} 
      >
        Mostrar todos
      </Button>
    </div>
  )
}

export default HeaderSection