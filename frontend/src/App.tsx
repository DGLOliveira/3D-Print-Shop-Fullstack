import { Outlet } from "react-router"
import Navbar from "./Components/Navbar.component.tsx"
import Footer from "./Components/Footer.component.tsx"
import { useEffect } from "react"
import { useBrandsStore } from "./stores/useBrands.store.tsx"
import { useAccessoriesStore } from "./stores/useAccessories.store.tsx"

function App() {

  const brandStore = useBrandsStore()
  const accessoryStore = useAccessoriesStore()
  useEffect(() => {
    brandStore.fetchBrands()
    accessoryStore.fetchCategories()
    accessoryStore.fetchAccessories()
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
