import AddProductCard from "./AddProductCard.component.tsx"
import ProductCard from "./ProductCard.component.tsx"
import ProductCardSkeleton from "./skeletons/ProductCardSkeleton.component.tsx"

import { type Accessories } from '../stores/useAccessories.store.tsx'

const StoreList = ({ products }: { products: Accessories }) => {

  // products should match the Accessories type (a record of products)


  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 gap-4 overflow-scroll h-full m-2">
        <AddProductCard />
        {Object.keys(products).length > 0 ? Object.keys(products).map((prodId: string) => {
          const prod = products[prodId as unknown as keyof Accessories]
          return (
            <ProductCard
              key={prodId}
              id={prodId}
              title={prod.name}
              image={prod.images[0] ? prod.images[0].image_url : ""}
              price={prod.price}
              discount={prod.discount}
            />
          )
        })
          :
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      </div>
      <div className="join flex justify-center m-4">
        <button className="join-item btn">«</button>
        <button className="join-item btn">Page 22</button>
        <button className="join-item btn">»</button>
      </div>
    </div>
  )
}

export default StoreList