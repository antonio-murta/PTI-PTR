import React from "react"
import Home from "../../components/MainPage/Home"
import NewArrivals from "../../components/newarrivals/NewArrivals"
import Shop from "../../components/shops/Shop"
import Wrapper from "../../components/wrapper/Wrapper"

const Transportador = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <Wrapper />
    </>
  )
}

export default Transportador