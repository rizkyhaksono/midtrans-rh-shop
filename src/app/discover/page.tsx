import { products } from "../../../data/products"
import CardUI from "@/components/ui/card-ui"

export default function DiscoverPage() {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {products.map((products) => {
        return <CardUI key={products.key} image1={products.image} title={products.title} price={products.price} desc={products.description} />
      })}
    </div>
  )
}
