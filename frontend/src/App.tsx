import { Outlet, useLocation } from "react-router"
import Navbar from "./Components/Navbar.component.tsx"
import Footer from "./Components/Footer.component.tsx"

function App() {

  let location = useLocation();

  return (
    <>
      <Navbar />
      {location.pathname !== "/" && <div className="h-16"></div>}
      <Outlet />
      <Footer />
    </>
  )
}

export default App
