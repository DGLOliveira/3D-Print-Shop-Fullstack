import React from 'react'
import { Funnel } from 'lucide-react'

const Prints = () => {


  const PrintCardSkeleton = () => {
    return (
      <div className="card bg-base-200 h-96 shadow-sm">
        <figure className="h-2/3">
          <div className="skeleton w-full h-full"></div>
        </figure>
        <div className="card-body">
          <h2 className="card-title w-1/2 h-8">Loading Product</h2>
          <p className=" h-4">Please wait</p>
          <div className="card-actions">
            <button className="btn btn-primary">
              <span className="loading loading-spinner loading-sm"></span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const printProductPlaceholderData = {
    name: "Product",
    imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    minPrice: 10,
    maxPrice: 100,
    discount: 10
  }

  const PrintCard = ({ name, imageSrc, minPrice, maxPrice, discount }: { name: string, imageSrc: string, minPrice: number, maxPrice: number, discount: number }) => {
    return (
      <div className="card bg-base-200 h-96 shadow-sm">
        <figure className="">
          <img
            src={imageSrc}
            className="rounded-xl" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{name}</h2>
          {discount > 0 ? <p><span className="line-through text-gray-400">{minPrice}€ - {maxPrice}€</span> {minPrice - (minPrice * discount / 100)}€ - {maxPrice - (maxPrice * discount / 100)}€</p> : <p>{minPrice}€ - {maxPrice}€</p>}
          <div className="card-actions">
            <button className="btn btn-primary">Check Product</button>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="flex flex-row w-full h-full relative">
        <button className="btn btn-primary rounded-full absolute p-2 z-50">
          <Funnel /> Filters
        </button>
      <aside className="border-r border-primary bg-base-200 drawer lg:drawer-open mr-2 w-auto">
        <form className="p-4 mt-6 flex flex-col">
          <fieldset>
            <div className="form-control my-2">
              <label className="label mb-2" htmlFor="search-print">Search</label>
              <input id="search-print" type="text" placeholder="Search" className="input input-bordered" />
            </div>
          </fieldset>
          <fieldset>
            <label className="label mb-2" htmlFor="category-print" >Category</label>
            <select id="category-print" name="category" defaultValue="All" className="select">
              <option>All</option>
              <option>Human</option>
              <option>Animal</option>
              <option>Architectural</option>
            </select>
          </fieldset>
          <fieldset>
          <div className="form-control flex flex-col my-2">
            <label className="label mb-2">Sort</label>
            <label className="label cursor-pointer my-1">
              <input type="radio" name="sort-print" className="radio radio-primary" />
              <span className="label-text">Name</span>
            </label>
            <label className="label cursor-pointer my-1">
              <input type="radio" name="sort-print" className="radio radio-primary" />
              <span className="label-text">Price</span>
            </label>
            <label className="label cursor-pointer my-1">
              <input type="radio" name="sort-print" className="radio radio-primary" />
              <span className="label-text">Discount</span>
            </label>
          </div>

          </fieldset>
        </form>

      </aside>
      <div className="grid grid-cols-3 gap-4 overflow-scroll h-full">
        <PrintCard {...printProductPlaceholderData} />
        <PrintCardSkeleton />
        <PrintCardSkeleton />
        <PrintCardSkeleton />
        <PrintCardSkeleton />
        <PrintCardSkeleton />
        <PrintCardSkeleton />
        <PrintCardSkeleton />
        <PrintCardSkeleton />
      </div>
    </div>
  )
}

export default Prints