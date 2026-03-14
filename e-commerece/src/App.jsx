import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Product from './Components/Product'
import About from './Components/About'
import NoPage from './Components/NoPage'
import Navbar from './Layout/Navbar'
import Login from './Layout/Login'
import Register from './Layout/Register'
import ManageProduct from './admin/ManageProduct'
import ProtectedRoutes from './Route/ProtectedRoutes'
import AdminRoute from './Route/AdminRoute'
import Order from './Components/Order'
import ProductDetail from './Components/ProductDetail'
import Cart from './Components/Cart'
const App = () => {
  return (

    console.log(import.meta.env.VITE_REACT_APP_BACKENDBASE_URL),
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/about' element={<About />} />
        <Route path='/manage-product' element=

          {
            <ProtectedRoutes>
              <AdminRoute>
              <ManageProduct />
              </AdminRoute>
            </ProtectedRoutes>

          } />
        <Route path='/product-detail/:id' element={<ProductDetail />} />
        <Route path='/order' element={<Order/>}/>
        <Route path='/add-to-cart' element={<Cart/>}/>
        <Route path='*' element={<NoPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App