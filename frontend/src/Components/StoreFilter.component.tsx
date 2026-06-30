import { useState } from 'react'
import { Funnel } from 'lucide-react'

const StoreFilter = () => {

  const [openFilter, setOpenFilter] = useState(false)

  return (
    <>
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
    </>
  )
}

export default StoreFilter