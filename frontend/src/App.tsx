import { Outlet } from "react-router"
import Navbar from "./Components/Navbar.component.tsx"
import Footer from "./Components/Footer.component.tsx"

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
