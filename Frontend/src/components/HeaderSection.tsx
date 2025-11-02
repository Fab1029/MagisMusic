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
      <button 
        className="mr-8 cursor-pointer text-gray-300 text-sm
        transition-all duration-100 ease-in-out hover:text-white"
      >
        Mostrar todos
      </button>
    </div>
  )
}

export default HeaderSection