import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.tsx'
import Home from './Pages/Home.page.tsx'
import FAQ from './Pages/FAQ.page.tsx'
import About from './Pages/About.page.tsx'
import Store from './Pages/Store.page.tsx'
import Product from './Pages/Product.page.tsx'
import Cart from './Pages/Cart.page.tsx'
import CheckOut from './Pages/CheackOut.page.tsx'
import Admin from './Pages/Admin.page.tsx'
import NoPage from './Pages/NoPage.page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="store" element={<Store />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
