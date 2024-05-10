interface RouteParamsProps {
  params: {id: string}
}

export default function ProductDetails({ params }: RouteParamsProps) {
	return (
		<h2>
			Detalhes do produto Id: {params.id}
		</h2>
	)
}