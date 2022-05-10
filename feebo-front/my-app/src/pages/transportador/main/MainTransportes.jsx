import React from "react"
import Notifications from "./Notifications"
import Transportes from "./Transportes"
import { AiOutlinePlus } from "react-icons/ai";
import "./style.css"

const MainTransportes = ({ addToCart, infoTransportes }) => {
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <Notifications />
          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Transportes</h2>
                <div className="new-transport"><button><div className="plus-icon"><AiOutlinePlus/></div>Novo Transporte</button></div>
              </div>
              <div className='heading-right row '>
                <span>Ver todos</span>
                <i className='fa-solid fa-caret-right'></i>
              </div>
            </div>
            <div className='product-content  grid1'>
              <Transportes addToCart={addToCart} infoTransportes={infoTransportes} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainTransportes