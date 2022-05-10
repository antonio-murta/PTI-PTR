import React, { useState } from "react"
import { RiSettings3Fill } from "react-icons/ri";
import "./style.css"


const Transportes = ({ infoTransportes, addToCart }) => {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }

  return (
    <>
      {infoTransportes.map((item, index) => {
        return (
          <div key={index} className='box'>
            <div className='transport mtop'>
              <div className='product-details'>
                <h3>{item.name}</h3>
                <h3>Saída: {item.saida}</h3>
                <h3>Chegada prevista: {item.chegada}</h3>
                <div className='settings'>
                  <button onClick={() => addToCart(item)}>
                    <div className="setts"><RiSettings3Fill/></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Transportes
