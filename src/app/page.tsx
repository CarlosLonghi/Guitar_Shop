'use client'

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Autoplay from "embla-carousel-autoplay"

import guitar1 from '@/assets/guitars/guitar-1.png'
import guitar2 from '@/assets/guitars/guitar-2.png'
import guitar3 from '@/assets/guitars/guitar-3.png'
import guitar4 from '@/assets/guitars/guitar-4.png'
import guitar5 from '@/assets/guitars/guitar-5.png'
import guitar6 from '@/assets/guitars/guitar-6.png'
import guitar7 from '@/assets/guitars/guitar-7.png'
import guitar8 from '@/assets/guitars/guitar-8.png'
import guitar9 from '@/assets/guitars/guitar-9.png'
import guitar10 from '@/assets/guitars/guitar-10.png'

const data = [
  {
    product: 'Guitarra Jackson',
    price: 18999,
    image: guitar1
  },
  {
    product: 'Guitarra Ltd',
    price: 7999,
    image: guitar2
  },
  {
    product: 'Guitarra Esp',
    price: 12999,
    image: guitar3
  },
  {
    product: 'Guitarra Ibanez',
    price: 9999,
    image: guitar4
  },
  {
    product: 'Guitarra Ibanez',
    price: 16299,
    image: guitar5
  },
  {
    product: 'Guitarra Custom',
    price: 36299,
    image: guitar6
  },
  {
    product: 'Guitarra Charvel',
    price: 26299,
    image: guitar7
  },
  {
    product: 'Guitarra Ibanez',
    price: 10299,
    image: guitar8
  },
  {
    product: 'Guitarra Ibanez Gio',
    price: 11299,
    image: guitar9
  },
  {
    product: 'Guitarra Ibanez',
    price: 12299,
    image: guitar10
  }
]
export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  )
  return (
    <main className="flex pl-8 ml-auto max-w-[calc(100vw-((100vw-1024px)/2))]">
      <Carousel
        className="relative"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
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
