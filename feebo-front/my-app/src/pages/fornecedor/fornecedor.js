import React from "react"
import Home from "../../components/PaginaTransportador/Home"
import NewArrivals from "../../components/newarrivals/NewArrivals"
import Main from "../../pages/fornecedor/mainpage/mainpage"
import Wrapper from "../../components/wrapper/Wrapper"

const Fornecedor = ({ addToCart, shopItems }) => {
  return (
    <>
      <Main shopItems={shopItems} addToCart={addToCart} />
      <Wrapper />
    </>
  )
}

export default Fornecedor