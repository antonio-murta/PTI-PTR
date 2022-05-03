import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route , Link } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import SignIn from "./pages/login"
import Registar from "./pages/registar"
import Transportador from "./pages/transportador"
import Fornecedor from "./pages/fornecedor"


function App() {
  const { productItems } = Data
  const { shopItems } = Sdata

  const [CartItem, setCartItem] = useState([])

  const addToCart = (product) => {
  
    const productExit = CartItem.find((item) => item.id === product.id)
    
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
     
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  const decreaseQty = (product) => {
    
    const productExit = CartItem.find((item) => item.id === product.id)

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
     
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Routes>
          <Route path='/' element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} /> }/>
          <Route path='/cart' element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} /> }/>
          <Route path='/login' element={<SignIn CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} /> }/>
          <Route path='/registar' element={<Registar CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} /> }/>
          <Route path='/transportador' element={<Transportador productItems={productItems} addToCart={addToCart} shopItems={shopItems} /> }/>
          <Route path='/fornecedor'  element={<Fornecedor productItems={productItems} addToCart={addToCart} shopItems={shopItems} /> }/>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
