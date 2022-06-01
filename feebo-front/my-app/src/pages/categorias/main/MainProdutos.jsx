import React from "react"
import Filtro from "./Filtrar"
import Produtos from "./Produtos"
import { AiOutlinePlus } from "react-icons/ai";
import "./pizza.css"

const MainProdutos = ({ addToCart, infoProdutos }) => {
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <Filtro />
          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Moda</h2>
              </div>
            </div>
            <div className='product-content  grid1'>
              <Produtos addToCart={addToCart} infoProdutos={infoProdutos} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainProdutos