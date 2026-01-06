import { Carousel , CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface CustomCarouselProps {
  data: any[];
}

function CustomCarousel({data}: CustomCarouselProps) {
  return (
    <div className="md:px-15">
      <Carousel
        className="w-full"
      >
        <CarouselContent className="w-full">
          {data.map((item, index) => (
            <CarouselItem key={index} className="basis-1/2 mr-4 lg:m-0 lg:basis-1/5">
              {item}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex hover:bg-primary"/>
        <CarouselNext className="hidden md:flex hover:bg-primary"/>
      </Carousel>
    </div>
  )
}

export default CustomCarousel