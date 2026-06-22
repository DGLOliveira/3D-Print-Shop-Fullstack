import { Link, useLocation } from 'react-router'
import { ShoppingCart, User } from 'lucide-react'


const Navbar = () => {
    let location = useLocation();

    return (
        <>
            <div className="has-[#open-menu:hover,#open-menu:focus]:[&_#menu]:block">
                <header className='bg-base-100 fixed top-0 left-0 w-full z-50'>
                    <nav className="navbar bg-base-100 pb-0 border-b-primary border-b-2">
                        <div className="container mx-auto">
                            <Link to="" >
                                <h1 className="text-3xl font-bold underline decoration-double">Print Shop</h1>
                            </Link>
                        </div>
                        <div className="container mx-auto flex justify-end align-middle h-full mb-0 gap-3">
                            <button id="open-menu" className="btn rounded-full shadow-none text-lg px-4" >
                                Menu
                            </button>
                            <button id="open-cart-preview" className="btn btn-primary rounded-full indicator p-2" >
                                <ShoppingCart />
                                <span className="indicator-item indicator-bottom badge badge-sm">0</span>
                            </button>
                            <button id="open-login" className="btn btn-primary rounded-full p-2" >
                                <User />
                            </button>
                        </div>
                    </nav>
                </header>

                <div id="menu" className='fixed hidden hover:block w-full bg-base-200 px-4' >
                    <ul className="menu md:menu-horizontal w-full lg:min-w-max mt-15">
                        <li>
                            <a className="text-lg">Products</a>
                            <ul>
                                <li>
                                    <Link to="store" className={location.pathname === "/store" ? "text-info" : ""}>
                                        Prints Library
                                    </Link>
                                </li>
                                <li>
                                    <Link to="store" className={location.pathname === "/store" ? "text-info" : ""}>
                                        Hardware
                                    </Link>
                                </li>
                                <li>
                                    <Link to="store" className={location.pathname === "/store" ? "text-info" : ""}>
                                        Filaments & Materials
                                    </Link>
                                </li>
                                <li>
                                    <Link to="store" className={location.pathname === "/store" ? "text-info" : ""}>
                                        Accessories
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="services" className={location.pathname === "/services" ? "text-info text-lg" : "text-lg"}>
                                Services
                            </Link>
                            <ul>
                                <li>
                                    <Link to="services/print_and_prototype" className={location.pathname === "/services/print_and_prototype" ? "text-info" : ""}>
                                        3D Printing and Prototyping
                                    </Link></li>
                                <li>
                                    <Link to="services/design_and_model" className={location.pathname === "/services/design_and_model" ? "text-info" : ""}>
                                        Design & 3D Modelling
                                    </Link></li>
                                <li>
                                    <Link to="services/technical_assistance" className={location.pathname === "/services/technical_assistance" ? "text-info" : ""}>
                                        Technical Assistance
                                    </Link></li>
                            </ul>
                        </li>
                        <li>
                            <div className="text-lg">Company</div>
                            <ul>
                                <li>
                                    <Link to="about" className={location.pathname === "/about" ? "text-info" : ""}>
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="faq" className={location.pathname === "/faq" ? "text-info" : ""}>
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link to="contact" className={location.pathname === "/contact" ? "text-info" : ""}>
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full h-16" />
        </>
    )
}

export default Navbar