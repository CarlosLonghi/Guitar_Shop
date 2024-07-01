import { Button } from "@/components/ui/button"
import { stripe } from "@/lib/stripe"
import Image from "next/image"
import Stripe from "stripe"

interface RouteParamsProps {
  params: {id: string}
}

export default async function ProductDetails({ params }: RouteParamsProps) {
	const productId = params.id

	const response = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

	const price = response.default_price as Stripe.Price
	if(!price.unit_amount) {
		return null
	}
	const product = {
		id: response.id,
		name: response.name,
		description: response.description,
		imageUrl: response.images[0],
		price: price.unit_amount / 100,
	}

	// await new Promise((resolve) => setTimeout(resolve, 9000))

	return (
		<main className="grid grid-cols-1 items-center gap-10 max-w-screen-lg lg:grid-cols-2 lg:gap-16 lg:items-stretch">
			<div className="w-full max-w-xl flex items-center justify-center object-contain p-4 m-auto rounded-md bg-gradient-to-b from-background to-secondary/50">
				<Image 
					className="object-contain h-[380px] md:h-[480px] lg:h-[530px]" 
					width={255} 
					height={530} 
					src={product.imageUrl} 
					alt={product.name}
					priority
				/>
			</div>
			<div className="flex flex-col gap-4 justify-between">
				<h2 className="text-3xl">{product.name}</h2>
				<span className="mt-4 text-2xl font-semibold text-emerald-500">
					{(product.price).toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</span>
				<p className="mt-2.5 text-lg">
					{product.description}
				</p>

				<Button size={"lg"} className="mt-auto text-lg font-semibold">Comprar</Button>
			</div>
		</main>
	)
}