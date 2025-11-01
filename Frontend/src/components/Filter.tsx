import { useState } from "react";


const categories = ["Todo", "Artista", "Álbumes", "Canciones", "Listas"];

function Filter() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeFilter = (index:number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="gap-2 flex items-center">
      {categories.map((category, index) => (
        <button 
          key={index}
          onClick={() => handleChangeFilter(index)}
          className={`px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${currentIndex === index ? 'bg-primary ring-2 ring-primary' : 'bg-card-foreground'}`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default Filter