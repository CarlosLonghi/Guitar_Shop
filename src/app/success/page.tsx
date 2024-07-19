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
    <main className="flex flex-col items-center justify-center flex-1">
      <h1 className="text-4xl font-bold mb-6">Compra Realizada</h1>

      <div className="flex flex-col gap-6 items-center max-w-screen-lg p-6 bg-gradient-to-b from-background to-secondary/50 rounded-lg shadow-lg md:flex-row">
        <div className="w-full h-96 p-2 rounded-lg overflow-hidden md:w-1/3">
          <Image src={product.images[0]} alt={product.name} width={255} height={530} className="object-contain h-full w-full"/>
        </div>

        <div className="flex-1 space-y-12 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Obrigado, {customerName}!
            </h2>
            <p className="text-2xl">
              Seu pedido está sendo preparado, agradecemos pela sua confiança.😁
            </p>
          </div>

          <div className="text-2xl w-full flex justify-center gap-2 md:justify-start md:w-fit">
            <span>Produto:</span>
            <strong>{product.name}</strong>
          </div>

          <Button className="text-2xl w-full md:w-auto mt-auto" size="lg" variant="outline" asChild>
            <Link href="/">
              Voltar ao catálogo
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}