interface PlayButtonProps {
  child?:any;  
  className?:any;
  onClick: () => void;  
};

function PlayButton({child, className, onClick}: PlayButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        absolute bottom-2 right-2 
        flex items-center justify-center 
        bg-primary rounded-full w-11 h-11 p-1
        opacity-0 translate-y-5 
        transition-all duration-200 ease-out
        hover:scale-115
        group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer
      `}
    >
      {child}
    </button>
  )
}

export default PlayButton