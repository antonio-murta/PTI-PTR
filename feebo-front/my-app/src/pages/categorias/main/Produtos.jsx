import React, { useState } from "react"
import { RiSettings3Fill } from "react-icons/ri";
import "./pizza.css"

const Produtos = ({ infoProdutos, addToCart }) => {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }

  return (
    <>
      {infoProdutos.map((item, index) => {
        return (
          <div key={index} className='box'>
            <div className='transport mtop'>
              <div className='img'>
                <img src={infoProdutos.foto} alt='' /> 
              </div>
              <div className='product-details'>
                <h3>{item.name}</h3>
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

export default Produtos
