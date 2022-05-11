import React, { useState } from "react"
import "./style-armazens.css"
import { RiSettings3Fill } from "react-icons/ri";


const Armazens = ({ infoArmazens, addToCart }) => {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }

  return (
    <>
      {infoArmazens.map((item, index) => {
        return (
          <div key={index} className='box'>
            <div className='armazem mtop'>
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

export default Armazens
