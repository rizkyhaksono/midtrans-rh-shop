import { products } from "../../../data/products"
import CardUI from "@/components/ui/card-ui"

export default function DiscoverPage() {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {products.map((products) => {
        return <CardUI key={products.key} image1={products.image} title={products.title} price={products.price} desc={products.description} />
      })}
    </div>
  )
}
