
import { Outlet } from "react-router"
import Navbar from "./Components/Navbar.component.tsx"
function App() {


  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
