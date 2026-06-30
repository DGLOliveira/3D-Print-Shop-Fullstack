import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import { ShoppingCart, User } from 'lucide-react'


const Navbar = () => {
    const [searchParams, _setSearchParams] = useSearchParams()
    const location = useLocation();
    const navigate = useNavigate()

    return (
        <>
            <div className="has-[#open-menu:hover,#open-menu:focus]:[&_#menu]:block">
                <header className='bg-base-100 top-0 left-0 w-full z-50'>
                    <nav className="navbar bg-base-100 pb-0 border-b-primary border-b-2">
                        <div className="container mx-auto">
                            <Link to="" >
                                <h1 className="text-3xl font-bold font-serif">Oniros3D</h1>
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
                            <button id="open-login" className="btn btn-primary rounded-full p-2" onClick={() => navigate("/account/login")}>
                                <User />
                            </button>
                        </div>
                    </nav>
                </header>

                <div id="menu" className='absolute hidden hover:block w-full bg-base-200 px-4 z-999' >
                    <ul className="menu md:menu-horizontal w-full lg:min-w-max justify-around px-8">
                        <li>
                            <Link to="store" className={location.pathname.slice(0, 6) === "/store" ? "text-primary text-lg" : "text-lg"}>
                                Products
                            </Link>
                            <ul>
                                <li>
                                    <Link to="store?category=prints" className={(location.pathname === "/store" && searchParams.get("category")==="Prints") ? "text-info" : ""}>
                                        Prints Library
                                    </Link>
                                </li>
                                <li>
                                    <Link to="store?category=hardware" className={(location.pathname === "/store" && searchParams.get("category")==="Hardware") ? "text-info" : ""}>
                                        Hardware
                                    </Link>
                                </li>
                                <li>
                                    <Link to="store?category=materials" className={(location.pathname === "/store" && searchParams.get("category")==="Materials") ? "text-info" : ""}>
                                        Filaments & Materials
                                    </Link>
                                </li>
                                <li>
                                    <Link to="store/accessories" className={(location.pathname === "/store" && searchParams.get("category")==="Accessories") ? "text-info" : ""}>
                                        Accessories
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="services" className={location.pathname.slice(0, 9) === "/services" ? "text-primary text-lg" : "text-lg"}>
                                Services
                            </Link>
                            <ul>
                                <li>
                                    <Link to="services/scanning-and-digital" className={location.pathname === "/services/scanning-and-digital" ? "text-info" : ""}>
                                        Scan and Digitalize
                                    </Link>
                                </li>
                                <li>
                                    <Link to="services/design-and-model" className={location.pathname === "/services/design-and-model" ? "text-info" : ""}>
                                        Design & 3D Modelling
                                    </Link>
                                </li>
                                <li>
                                    <Link to="services/print-and-prototype" className={location.pathname === "/services/print-and-prototype" ? "text-info" : ""}>
                                        3D Printing and Prototyping
                                    </Link>
                                </li>
                                <li>
                                    <Link to="services/technical-assistance" className={location.pathname === "/services/technical-assistance" ? "text-info" : ""}>
                                        Technical Assistance
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="company" className={location.pathname.slice(0, 8) === "/company" ? "text-primary text-lg" : "text-lg"}>
                                Company
                            </Link>
                            <ul>
                                <li>
                                    <Link to="company/about" className={location.pathname === "/company/about" ? "text-info" : ""}>
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="company/contact" className={location.pathname === "/company/contact" ? "text-info" : ""}>
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link to="company/news" className={location.pathname === "/company/news" ? "text-info" : ""}>
                                        News and Updates
                                    </Link>
                                </li>
                                <li>
                                    <Link to="company/jobs" className={location.pathname === "/company/jobs" ? "text-info" : ""}>
                                        Jobs
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="help" className={location.pathname.slice(0, 5) === "/help" ? "text-primary text-lg" : "text-lg"}>
                                Help
                            </Link>
                            <ul>
                                <li>
                                    <Link to="help/faq" className={location.pathname === "/help/faq" ? "text-info" : ""}>
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link to="help/terms-and-conditions" className={location.pathname === "/help/terms-and-conditions" ? "text-info" : ""}>
                                        Terms and Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link to="help/privacy-policy" className={location.pathname === "/help/privacy-policy" ? "text-info" : ""}>
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="help/cookies-policy" className={location.pathname === "/help/cookies-policy" ? "text-info" : ""}>
                                        Cookies Policy
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <div className="w-full h-16" />*/}
        </>
    )
}

export default Navbar