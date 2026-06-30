import React from 'react'
import { useNavigate, createSearchParams } from 'react-router'
import AddProductCard from "./AddProductCard.component.tsx"
import PrintCard from "./PrintCard.component.tsx"
import PrintCardSkeleton from "./skeletons/PrintCardSkeleton.component.tsx"

const StoreList = () => {
    
  const navigate = useNavigate()
  const navToPrint = (prodId: string) => {
    navigate({
      pathname: "/store/product",
      search: createSearchParams({ prodId }).toString(),
    })
  }
    
  const printProductPlaceholderData = {
    name: "Product Placeholder",
    imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    minPrice: 10,
    maxPrice: 100,
    discount: 10
  }

  return (
        <div className="w-full h-full">
          <div className="grid grid-cols-3 gap-4 overflow-scroll h-full m-2">
            <AddProductCard />
            <PrintCard {...printProductPlaceholderData} />
            <PrintCardSkeleton />
            <PrintCardSkeleton />
            <PrintCardSkeleton />
            <PrintCardSkeleton />
            <PrintCardSkeleton />
            <PrintCardSkeleton />
            <PrintCardSkeleton />
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