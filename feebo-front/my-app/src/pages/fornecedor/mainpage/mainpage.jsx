import React from "react"
import Notif from "./notificacoes"
import Armazens from "./todosArmazens"
import "./style-armazens.css"
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



const MainArmazens = ({ addToCart, infoArmazens }) => {
  let navigate = useNavigate();
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
              <div className="new-transport">
                  <button onClick={() => navigate("/addTransportes")}>
                    <div className="plus-icon"><AiOutlinePlus/></div>
                    Novo Armazém
                  </button>
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

export default MainArmazens