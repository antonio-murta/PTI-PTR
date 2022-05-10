import React from "react"
import Notif from "./notificacoes"
import Armazens from "./todosArmazens"
import "./style.css"

const Main = ({ addToCart, shopItems }) => {
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <Notif/>

          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Armazéns</h2>
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
