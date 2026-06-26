import { Outlet, useLocation, useNavigate } from "react-router"

const StorePage = () => {

  const location = useLocation();
  const navigate = useNavigate()
  console.log(location);

  const storePages = [
    {
      title: "Prints",
      path: "/store/prints"
    },
    {
      title: "Hardware",
      path: "/store/hardware"
    },
    {
      title: "Materials",
      path: "/store/materials"
    },
    {
      title: "Accessories",
      path: "/store/accessories"
    }
  ]

  const ProductCategory = ({ title, path }: { title: string, path: string }) => {
    return (
      <button className="w-50 card bg-base-100 border-neutral border cursor-pointer hover:border-primary focus:border-primary" onClick={()=> navigate(path)}>
        <figure className="">

          <div className="skeleton w-full h-40"></div>
          {/*<img
            src=""
            alt="Shoes"
            className="" />*/}
        </figure>
        <div className="card-body items-center text-center p-2">
          <h3 className={location.pathname === path ? "card-title text-primary" : "card-title"}>{title}</h3>
        </div>
      </button >
    )
  }

  return (
    <>
    <div className="w-full border-b border-primary">
      <div className="flex flex-row justify-around m-4">
        {storePages.map((page) => <ProductCategory title={page.title} path={page.path} />)}
      </div>
    </div>
    <Outlet />
    </>
  )
}

export default StorePage