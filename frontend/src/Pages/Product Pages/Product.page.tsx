import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import MDEditor from '@uiw/react-md-editor';

import { useBrandsStore } from '../../stores/useBrands.store.tsx'
import { useAccessoriesStore, type Accessory } from '../../stores/useAccessories.store.tsx'

import ShowImages from '../../Components/ShowImages.component.tsx'

const ProductPage = () => {
  const { brands } = useBrandsStore()
  const { accessories } = useAccessoriesStore()
  const [searchParams] = useSearchParams()

  const [prodData, setProdData] = useState<{} | Accessory>({})

  const prodId: number = Number(searchParams.get("prodId"))
  const category = searchParams.get("category")

  useEffect(() => {
    console.log(prodId, category)
    if (prodId && category) {
      if (category === "Accessories") {
        if (Array.isArray(accessories)) {
          setProdData(accessories[prodId])
        } else {
          setProdData((accessories as Record<string, Accessory>)[String(prodId)])
        }
      }
    }
  }, [])


  const isAccessory = (data: any): data is Accessory => (data as Accessory).images !== undefined

  if (prodId && category && isAccessory(prodData)) {
    return (
      <div className="flex flex-col items-center w-full mt-5">
        <div className="container flex flex-col items-center gap-5">
          <div className="flex flex-row w-full gap-5">
            <ShowImages images={prodData.images} />
            <div className="container flex flex-1 flex-col gap-4 justify-between">
              <div>
                <a className="text-2xl">{brands.find(brand => brand.id === prodData.brandId)?.name}</a>
                <h2 className="text-6xl">{prodData.name}{prodData.subname == "" ? "" : ", " + prodData.subname}</h2>
              </div>
              <div className="flex flex-col mt-5">
                <p className="text-xl"><b>Price: €{prodData.price}</b></p>
                {prodData.discount > 0 && <p>{prodData.discount}%</p>}
              </div>
              <button className="btn btn-primary mt-4">Add to Cart</button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl text-center">Description</h2>
            <div className="container my-6">
              <MDEditor.Markdown source={prodData.description} />
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <div>Product page</div>
  }
}

export default ProductPage