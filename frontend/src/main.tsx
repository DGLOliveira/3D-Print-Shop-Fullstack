import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import './index.css'

import App from './App.tsx'
import Home from './Pages/Home.page.tsx'
import NoPage from './Pages/NoPage.page.tsx'

//Account Pages
import Account from './Pages/Account Pages/Account.page.tsx'
import Cart from './Pages/Account Pages/Cart.page.tsx'
import CheckOut from './Pages/Account Pages/CheckOut.page.tsx'
import Login from './Pages/Account Pages/Login.page.tsx'

//Admin Pages
import Admin from './Pages/Admin Pages/Admin.page.tsx'
import ManageBrands from './Pages/Admin Pages/ManageBrands.page.tsx'
import ManageCategories from './Pages/Admin Pages/ManageCategories.page.tsx'

//Company Pages
import Company from './Pages/Company Pages/Company.page.tsx'

import About from './Pages/Company Pages/About.page.tsx'
import Contact from './Pages/Company Pages/Contact.page.tsx'
import Jobs from './Pages/Company Pages/Jobs.page.tsx'
import News from './Pages/Company Pages/News.page.tsx'

//Help Pages
import Help from './Pages/Help Pages/Help.page.tsx'

import FAQ from './Pages/Help Pages/FAQ.page.tsx'
import Cookies from './Pages/Help Pages/Cookies.page.tsx'
import Privacy from './Pages/Help Pages/Privacy.page.tsx'
import Terms from './Pages/Help Pages/Terms.page.tsx'

//Product Pages
import Store from './Pages/Product Pages/Store.page.tsx'
import Product from './Pages/Product Pages/Product.page.tsx'
import AddProduct from './Pages/Product Pages/AddProduct.page.tsx'
import EditProduct from './Pages/Product Pages/EditProduct.page.tsx'

//Service Pages
import Service from './Pages/Service Pages/Service.page.tsx'

import TechnicalAssistance from './Pages/Service Pages/TechnicalAssistance.page.tsx'
import PrintAndPrototype from './Pages/Service Pages/PrintAndPrototype.page.tsx'
import DesignAndModel from './Pages/Service Pages/DesignAndModel.page.tsx'
import ScanningAndDigitalization from './Pages/Service Pages/ScanningAndDigitalization.page.tsx'



createRoot(document.getElementById('root')!).render(
  <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          <Route path="store" element={<Store />} >
            <Route path=":id" element={<Product />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product" element={<EditProduct />} />
          </Route>
          <Route path="services" element={<Service />} >
            <Route path="scanning-and-digital" element={<ScanningAndDigitalization />} />
            <Route path="design-and-model" element={<DesignAndModel />} />
            <Route path="print-and-prototype" element={<PrintAndPrototype />} />
            <Route path="technical-assistance" element={<TechnicalAssistance />} />
          </Route>
          <Route path="company" element={<Company />} >
            <Route path="jobs" element={<Jobs />} />
            <Route path="news" element={<News />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="help" element={<Help />} >
            <Route path="faq" element={<FAQ />} />
            <Route path="terms-and-conditions" element={<Terms />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="cookies-policy" element={<Cookies />} />
          </Route>
          <Route path="account" element={<Account />} >
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckOut />} />
          </Route>
          <Route path="admin" element={<Admin />} >
            <Route path="manage-brands" element={<ManageBrands />} />
            <Route path="manage-categories" element={<ManageCategories />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>,
)
