import React from "react"
import Notif from "./notificacoes"
import Armazens from "./todosArmazens"
import { AiOutlinePlus } from "react-icons/ai";
import "./style.css"

const Main = ({ addToCart, infoArmazens }) => {
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <Notif/>
          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Armazéns</h2>
                <div className="new-transport"><button><div className="plus-icon"><AiOutlinePlus/></div>Novo Armazém</button></div>
              </div>
              <div className='heading-right row '>
                <span>Ver todos</span>
                <i className='fa-solid fa-caret-right'></i>
              </div>
            </div>
            <div className='product-content  grid1'>
              <Armazens addToCart={addToCart} infoArmazens={infoArmazens} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Main
