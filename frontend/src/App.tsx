import { Outlet } from "react-router"
import Navbar from "./Components/Navbar.component.tsx"
import Footer from "./Components/Footer.component.tsx"
import { useEffect } from "react"

function App() {

  useEffect(() => {
  }, [])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
