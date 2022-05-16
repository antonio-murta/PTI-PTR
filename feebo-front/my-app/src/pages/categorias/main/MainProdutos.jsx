import React from "react"
import Notifications from "./Filtrar"
import Produtos from "./Produtos"
import { AiOutlinePlus } from "react-icons/ai";
import "./pizza.css"

const MainProdutos = ({ addToCart, infoProdutos }) => {
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <Notifications />
          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Moda</h2>
                <div className="new-transport"><button><div className="plus-icon"><AiOutlinePlus/></div>Novo Transporte</button></div>
              </div>
              <div className='heading-right row '>
                <span>Ver todos</span>
                <i className='fa-solid fa-caret-right'></i>
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