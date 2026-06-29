import { Link } from "react-router"
import hero from "../assets/hero_1_generated.png"
import ProductCard from "../Components/ProductCard.component.tsx"
import FeaturedCarousel from "../Components/FeaturedCarousel.component.tsx"

import digitalization from "../assets/3D_Scan_and_Digitalization.png"
import modelling from "../assets/3D_Design_and_Modelling.png"
import printing from "../assets/3D_Printing_and_Prototyping.png"
import support from "../assets/3D_Technical_Support.png"

import hardware from "../assets/3D_Hardware_Bundle.png"
import accessories from "../assets/3D_Accessories_Bundle.png"
import materials from "../assets/3D_Filament_Bundle.png"
import prints from "../assets/3D_Prints_Bundle.png"

const HomePage = () => {

  const productCardEmpty = {
    title: "Product",
    price: 10,
    discount: 10,
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  }

  const ProductCategory = ({ title, image, pathname }: { title: string, image: string, pathname: string }) => {
    return (
      <Link to={pathname} className="card w-60 bg-base-100 border-neutral border cursor-pointer hover:border-primary focus:border-primary" >
        <figure className="">

          {/*<div className="skeleton w-full h-40"></div>*/}
          <img
            src={image}
            className="w-60 h-60" />
        </figure>
        <div className="card-body items-center text-center p-1">
          <h3 className="card-title">{title}</h3>
        </div>
      </Link >
    )
  }

  const ServiceCategory = ({ title, image, pathname }: { title: string, image: string, pathname: string }) => {
    return (
      <Link to={pathname}>
        <button className="card bg-base-100 card-xs shadow-sm border-2 border-neutral border-square cursor-pointer hover:border-primary focus:border-primary">
          <div className="card-body">
            <h2 className="card-title text-info text-xl">{title}</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <figure className="">

              {/*<div className="skeleton w-full h-40"></div>*/}
              <img
                src={image}
                alt="Shoes"
                className="w-full h-40" />
            </figure>
          </div>
        </button>
      </Link>
    )
  }

  /*
  //Previous hero section using hero1.jpeg
  

      <div
        className="hero h-screen "
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content isolation-auto text-neutral-content text-center p-20">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">
              <Link to="/store">Order now</Link>
            </button>
          </div>
        </div>
      </div>

          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right",
  */


  return (
    <div className="w-full">

      {/* Hero section */}

      <div
        className="hero place-items-start h-[calc(100vh-64px)] mt-16 bg-right contain-content bg-black"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
        }}
      >
        <div className="hero-content isolation-auto  text-neutral-content p-20">
          <div className="">
            <h1 className="mb-5 text-6xl font-bold">From Dreams To Forms</h1>
            <p className="mb-5 max-w-md h-[30vh]">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary m-2">
              <Link to="/services">Request</Link>
            </button>
            or
            <button className="btn btn-secondary m-2">
              <Link to="/store">Buy</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Featured section */}
      <h2 className="text-3xl font-bold w-full text-center pt-10">Featured</h2>
      <FeaturedCarousel />

      {/* Product Categories */}
      <div className="w-full p-10 mx-auto py-8 bg-base-300">
        <div className="grid grid-cols-4 gap-2">
          <ProductCategory title="Prints" image={prints} pathname="/store/prints" />
          <ProductCategory title="Materials" image={materials} pathname="/store/materials" />
          <ProductCategory title="Hardware" image={hardware} pathname="/store/hardware" />
          <ProductCategory title="Accessories" image={accessories} pathname="/store/accessories" />
        </div>
      </div>

      {/* Services */}
      <div className="w-full p-10 mx-auto py-8">
        <div className="grid grid-cols-4 gap-2">
          <ServiceCategory title="Scan and Digitalize" image={digitalization} pathname="/services/scanning-and-digital" />
          <ServiceCategory title="Design And Modelling" image={modelling} pathname="/services/design-and-model" />
          <ServiceCategory title="Prototyping And Printing" image={printing} pathname="/services/print-and-prototype" />
          <ServiceCategory title="Technical Support" image={support} pathname="/services/technical-assistance" />
        </div>
      </div>

      {/* Social Proof */}
      <div className="w-full bg-base-300">
      </div>

      {/* Partners */}
      <div className="w-full">
      </div>
    </div>

  )
}

export default HomePage