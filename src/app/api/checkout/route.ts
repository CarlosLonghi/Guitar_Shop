import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  let priceId;
      
  try {
    const body = await request.json();
    priceId = body.priceId;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!priceId) {
    return NextResponse.json({ error: 'Price not found.' }, { status: 400 });
  }

  try {
    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_URL}/`;

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ checkoutUrl: checkoutSession.url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  let sessionId = body.id;
  console.log(sessionId);
  

  if (!sessionId || typeof sessionId !== 'string') {
    return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    });
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error:  (error as Error).message }, { status: 500 });
  }
}