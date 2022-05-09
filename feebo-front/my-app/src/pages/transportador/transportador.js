import React from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import Shop from "./main/Shop"

const Transportador = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
    <Shop shopItems={shopItems} addToCart={addToCart} />
          <Wrapper />
    </>
  )
}

export default Transportador