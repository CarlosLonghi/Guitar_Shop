'use client'

import axios from "axios";
import { Button } from "./ui/button";

interface PropsBuyButton {
  defaultPriceId: string
}

export function BuyButton({defaultPriceId}: PropsBuyButton) {

  // To Do: terminar de implementar envio para o checkout com o stripe
  async function handleBuyProduct() {    
    try {
      console.log('Id do produto: ', defaultPriceId);
      
      const response = await axios.post('/api/checkout/', {
        priceId: defaultPriceId
      })

      // Não está chegando aqui
      console.log('Após o axios');

      const { checkoutUrl } = response.data      
      
      window.location.href = checkoutUrl
    } catch (err) {
      // To Do: Conectar com alguma ferramenta de observabilidade (Datadog/ Sentry)
      console.log(err);

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <Button 
      className="mt-auto text-lg font-semibold"
      size={"lg"}
      onClick={handleBuyProduct}
    >
      Comprar
    </Button>
  )
}