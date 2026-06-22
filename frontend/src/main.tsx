import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.tsx'
import Home from './Pages/Home.page.tsx'
import FAQ from './Pages/FAQ.page.tsx'
import About from './Pages/About.page.tsx'
import Contact from './Pages/Contact.page.tsx'
import Store from './Pages/Store.page.tsx'
import Product from './Pages/Product.page.tsx'
import Service from './Pages/Service.page.tsx'
import TechnicalAssistance from './Pages/TechnicalAssistance.page.tsx'
import PrintAndPrototype from './Pages/PrintAndPrototype.page.tsx'
import DesignAndModel from './Pages/DesignAndModel.page.tsx'
import Cart from './Pages/Cart.page.tsx'
import CheckOut from './Pages/CheckOut.page.tsx'
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
          <Route path="contact" element={<Contact />} />
          <Route path="store" element={<Store />} />
          <Route path="product" element={<Product />} />
          <Route path="services" element={<Service />} >
          </Route>
            <Route path="services/technical_assistance" element={<TechnicalAssistance />} />
            <Route path="services/print_and_prototype" element={<PrintAndPrototype />} />
            <Route path="services/design_and_model" element={<DesignAndModel />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
