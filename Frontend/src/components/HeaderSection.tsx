import { Button } from "./ui/button";

interface HeaderSectionProps {
  title: string;
  onClick?: () => void;
}

function HeaderSection({title, onClick}: HeaderSectionProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold md:text-2xl">
        {title}
      </h1>
      <Button
        variant='header'
        onClick={onClick}
        className="p-0 m-0" 
      >
        Mostrar todos
      </Button>
    </div>
  )
}

export default HeaderSection