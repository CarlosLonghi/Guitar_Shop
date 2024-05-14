import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import guitar1 from '@/assets/guitars/guitar-1.png'
import guitar2 from '@/assets/guitars/guitar-2.png'
import guitar3 from '@/assets/guitars/guitar-3.png'
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const data = [
  {
    product: 'Violão',
    price: 2000,
    image: guitar1
  },
  {
    product: 'Guitarra Custom',
    price: 8000,
    image: guitar2
  },
  {
    product: 'Guitarra Signature',
    price: 12000,
    image: guitar3
  },
  {
    product: 'Guitarra Signature',
    price: 12000,
    image: guitar3
  },
  {
    product: 'Guitarra Signature',
    price: 12000,
    image: guitar3
  },
  {
    product: 'Guitarra Signature',
    price: 12000,
    image: guitar3
  },
  {
    product: 'Guitarra Signature',
    price: 12000,
    image: guitar3
  },
]
export default function Home() {
  return (
    <main className="flex pl-8 ml-auto max-w-[calc(100vw-((100vw-1024px)/2))]">
      <Carousel
        opts={{
          align: "start",
        }}
        className="relative"
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="group p-1 relative bg-gradient-to-b from-background to-secondary/50 flex flex-col justify-center overflow-hidden rounded-md h-full">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image className="object-contain max-h-[650px] h-5/6 w-full" width={250} height={480} src={item.image} alt=""/>
                </CardContent>
                <CardFooter className="absolute p-4 bottom-1 right-1 left-1 flex translate-y-full justify-between items-center rounded-md bg-secondary-foreground/10 opacity-0 transition-all duration-200 ease-in group-hover:opacity-100 group-hover:translate-y-0">
                  <strong className="text-lg">{item.product}</strong>
                  <span className="text-base font-semibold text-emerald-500">
                    {(item.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 top-1/2" />
        <CarouselNext className="right-2 top-1/2" />
      </Carousel>
    </main>
  );
}
