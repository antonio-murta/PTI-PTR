import React from "react"
import Wrapper from "../../components/wrapper/Wrapper"
import MainProdutos from "./main/MainProdutos"

const Categorias = ({ productItems, addToCart, CartItem, infoProdutos }) => {
  return (
    <>
    <MainProdutos infoProdutos={infoProdutos} addToCart={addToCart} />
          <Wrapper />
    </>
  )
}

export default Categorias