import { Outlet } from "react-router"
import Navbar from "./Components/Navbar.component.tsx"
import Footer from "./Components/Footer.component.tsx"
import { useEffect } from "react"

import { useBrandsStore } from './stores/useBrands.store.tsx'
import { useCategoriesStore } from './stores/useCategories.store.tsx'

function App() {

  useEffect(() => {
    useBrandsStore.getState().fetchBrands()
    useCategoriesStore.getState().fetchCategories()
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
