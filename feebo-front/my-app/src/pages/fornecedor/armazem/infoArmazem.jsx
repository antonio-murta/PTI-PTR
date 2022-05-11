import React from "react"
import Notif from "../mainpage/notificacoes"
import Armazens from "../mainpage/produtosArmazem"
import "../mainpage/style.css"

const Main = ({ addToCart, shopItems }) => {
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <Notif/>

          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Nome Armazém</h2>
              </div>
              <div className='heading-right row '>
                <span>Ver todos</span>
                <i className='fa-solid fa-caret-right'></i>
              </div>
            </div>
            <div className='product-content  grid1'>
              <Armazens addToCart={addToCart} shopItems={shopItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Main
