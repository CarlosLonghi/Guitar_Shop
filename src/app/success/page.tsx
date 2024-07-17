import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";
import Custom404 from "../404";

interface Product {
  name: string;
  description: string;
  images: string[];
}

interface Session {
  line_items: {
    data: {
      price: {
        product: Product;
      };
    }[];
  };
  customer_details: { name: string };
}

async function getSessionData(sessionId: string): Promise<Session | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    });
    return session as Session;
  } catch (error) {
    console.error('Error fetching session data:', error);
    return null;
  }
}

export default async function Success({ searchParams }: { searchParams: { session_id: string } }) {
  const sessionId = searchParams.session_id;
  const session = await getSessionData(sessionId);
  
  if (!session) {
    return <Custom404 />; 
  }

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product;

  return (
    <main className="flex flex-col gap-10 items-center justify-center flex-1">
      <h1 className="text-4xl font-bold">Compra Realizada</h1>

      <div className="flex flex-col gap-6 items-center">
        <div className="w-full max-w-xs h-96 p-2 rounded-md bg-gradient-to-b from-background to-secondary/50">
          <Image src={product.images[0]} alt={product.name} width={255} height={530} className="object-contain h-full w-full rounded-md"/>
        </div>

        <p className="text-2xl font-bold text-center">
          {customerName} agradeçemos pela sua confiança! Seu pedido já está sendo preparado.
        </p>

        <table className="table-auto w-full max-w-xs">
          <tbody>
            <tr className="text-xl">
              <td>Cliente:</td>
              <td><strong>{customerName}</strong></td>
            </tr>
            <tr className="text-xl">
              <td>Produto:</td>
              <td><strong>{product.name}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Button className="w-full max-w-xs text-2xl" size={"lg"} variant="outline" asChild>
        <Link href={'/'}>
          Voltar ao catálogo
        </Link>
      </Button>
    </main>
  )
}