import React from "react"
import Home from "../components/PaginaTransportador/Home"
import NewArrivals from "../components/newarrivals/NewArrivals"
import Shop from "../components/shops/Shop"
import Wrapper from "../components/wrapper/Wrapper"

const Fornecedor = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <Wrapper />
    </>
  )
}

export default Fornecedor