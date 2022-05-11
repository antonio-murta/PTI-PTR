import React from "react"
import Main from "../../pages/fornecedor/mainpage/mainpage"
import Wrapper from "../../components/wrapper/Wrapper"

const Fornecedor = ({ addToCart,infoArmazens }) => {
  return (
    <>
      <Main infoArmazens={infoArmazens} addToCart={addToCart} />
      <Wrapper />
    </>
  )
}

export default Fornecedor