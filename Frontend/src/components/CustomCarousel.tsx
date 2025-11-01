import { Carousel , CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface CustomCarouselProps {
  data: any[];
}

function CustomCarousel({data}: CustomCarouselProps) {
  return (
    <div className="px-18">
      <Carousel
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {data.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:basis-1/2 lg:basis-1/5">
              {item}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hover:bg-primary"/>
        <CarouselNext className="hover:bg-primary"/>
      </Carousel>
    </div>
  )
}

export default CustomCarousel