import React from 'react'
import { useNavigate, createSearchParams } from 'react-router'
import AddProductCard from "./AddProductCard.component.tsx"
import ProductCard from "./ProductCard.component.tsx"
import ProductCardSkeleton from "./skeletons/ProductCardSkeleton.component.tsx"

const StoreList = () => {
    
  const navigate = useNavigate()
  const navToPrint = (prodId: string) => {
    navigate({
      pathname: "/store/product",
      search: createSearchParams({ prodId }).toString(),
    })
  }
    
  const printProductPlaceholderData = {
    title: "Product Placeholder",
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    price: 10,
    discount: 10
  }

  return (
        <div className="w-full h-full">
          <div className="grid grid-cols-3 gap-4 overflow-scroll h-full m-2">
            <AddProductCard />
            <ProductCard {...printProductPlaceholderData} />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
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