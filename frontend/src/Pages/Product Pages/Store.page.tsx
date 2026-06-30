import { useState, useEffect, Fragment } from "react"
import { useSearchParams, createSearchParams, Outlet, useLocation, useNavigate } from "react-router"

import StoreList from '../../Components/StoreList.component.tsx'
import StoreFilter from '../../Components/StoreFilter.component.tsx'


import hardware from "../../assets/3D_Hardware_Bundle.png"
import accessories from "../../assets/3D_Accessories_Bundle.png"
import materials from "../../assets/3D_Filament_Bundle.png"
import prints from "../../assets/3D_Prints_Bundle.png"

// Dictionary of store pages and their images based on category
const STORE_PAGES: Record<string, string> = {
  "Prints": prints,
  "Hardware": hardware,
  "Materials": materials,
  "Accessories": accessories
}

const StorePage = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  function getValidSearchCategory() {
    let category = searchParams.get("category")
    if (category && Object.keys(STORE_PAGES).map(title => title).includes(category)) {
      return category
    }
    return ""
  }

  const [category, setCategory] = useState(getValidSearchCategory())

  // update the search params
  useEffect(() => {
    let newSearchParams = {}
    if (category) {
      newSearchParams = { ...newSearchParams, "category": category }
    }
    setSearchParams(newSearchParams)
  }, [category])


  const ProductCategory = ({ title, image }: { title: string, image: string }) => {
    return (
      <button className="w-44 card bg-base-100 border-neutral border cursor-pointer hover:border-primary focus:border-primary" onClick={() => setCategory(title)}>
        <figure className="">

          {/*<div className="skeleton w-full h-40"></div>*/}
          <img
            src={image}
            alt="Shoes"
            className="h-40 w-40" />
        </figure>
        <div className="card-body items-center text-center p-2">
          <h3 className={title === category ? "card-title text-info" : "card-title"}>{title}</h3>
        </div>
      </button >
    )
  }

  return (
    <>
      {location.pathname === "/store" ?
        <>
          <div className="w-full border-b border-primary bg-base-200 p-4">
            <div className="flex flex-row justify-around ">
              {Object.keys(STORE_PAGES).map((title) =>
                <Fragment key={title}>
                  <ProductCategory title={title} image={STORE_PAGES[title]} />
                </Fragment>
              )}
            </div>
          </div>
          {category === "" ?
            <div className="h-[50vh] w-screen flex justify-center items-center text-4xl">
              <h2>Select a category</h2>
            </div>
            :
            <div className="flex flex-row w-full h-full relative">
              <StoreFilter />
              <StoreList />
            </div>
          }
        </>
        :
        <Outlet />}
    </>
  )
}

export default StorePage