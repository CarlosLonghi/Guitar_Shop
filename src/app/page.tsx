// 'use client'

import React, { useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent, CardFooter } from "@/components/ui/card";

// import Autoplay from "embla-carousel-autoplay"

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

export default async function Home() {
  // const plugin = React.useRef(
  //   Autoplay({ delay: 3500, stopOnInteraction: true })
  // )

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products: Product[] = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    if(!price.unit_amount) {
      return null
    }

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
    }
  }).filter(Boolean) as Product[];

  return (
    <main className="flex ml-auto max-w-[calc(100vw-((100vw-1024px)/2))]">
      <Carousel
        // plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.play}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/product/${product.id}`} prefetch={true}>
                <Card className="group p-1 relative bg-gradient-to-b from-background to-secondary/50 flex flex-col justify-center overflow-hidden rounded-md">
                  <CardContent className="flex aspect-square items-center justify-center mb-10 mt-4 lg:mb-16">
                    <Image 
                      className="object-contain h-[380px] md:h-[480px] lg:h-[530px]" 
                      width={255} 
                      height={530} 
                      src={product.imageUrl} 
                      alt={product.name}
                      priority
                    />
                  </CardContent>
                  <CardFooter className="absolute p-4 bottom-1 right-1 left-1 flex justify-between items-center rounded-md bg-secondary-foreground/10 transition-all duration-200 ease-in md:translate-y-16 md:group-hover:translate-y-0">
                    <strong className="text-xl">{product.name}</strong>
                    <span className="text-base font-semibold text-emerald-500">
                      {(product.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 top-1/2" />
        <CarouselNext className="right-2 top-1/2" />
      </Carousel>
    </main>
  );
}
