import { stripe } from "@/lib/stripe"

export async function GET() {
  const priceId = 'price_1PGrFQD2HCMoyV8X9Utth4LD'

  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    success_url: successUrl,
    cancel_url: cancelUrl
  })
  
  return Response.json({ checkoutUrl: checkoutSession.url })
}