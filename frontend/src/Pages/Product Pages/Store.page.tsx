import { Outlet, useLocation, useNavigate } from "react-router"
import hardware from "../../assets/3D_Hardware_Bundle.png"
import accessories from "../../assets/3D_Accessories_Bundle.png"
import materials from "../../assets/3D_Filament_Bundle.png"
import prints from "../../assets/3D_Prints_Bundle.png"

const StorePage = () => {

  const location = useLocation();
  const navigate = useNavigate()
  console.log(location);

  const storePages = [
    {
      title: "Prints",
      path: "/store/prints",
      image: prints
    },
    {
      title: "Hardware",
      path: "/store/hardware",
      image: hardware
    },
    {
      title: "Materials",
      path: "/store/materials",
      image: materials
    },
    {
      title: "Accessories",
      path: "/store/accessories",
      image: accessories
    }
  ]

  const ProductCategory = ({ title, path, image }: { title: string, path: string, image: string }) => {
    return (
      <button className="w-44 card bg-base-100 border-neutral border cursor-pointer hover:border-primary focus:border-primary" onClick={()=> navigate(path)}>
        <figure className="">

           {/*<div className="skeleton w-full h-40"></div>*/}
         <img
            src={image}
            alt="Shoes"
            className="h-40 w-40" />
        </figure>
        <div className="card-body items-center text-center p-2">
          <h3 className={location.pathname === path ? "card-title text-info" : "card-title"}>{title}</h3>
        </div>
      </button >
    )
  }

  return (
    <>
    <div className="w-full border-b border-primary bg-base-200 p-4">
      <div className="flex flex-row justify-around ">
        {storePages.map((page) => <ProductCategory title={page.title} image={page.image} path={page.path} />)}
      </div>
    </div>
    <Outlet />
    </>
  )
}

export default StorePage