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
          <div key={index} className='caixa'>
            <div className='item mtop'>
                <div className='fotos'>
                  <img src={item.foto} alt='' /> 
                </div>
              <div className='product-details'>
                <h2>{item.name}</h2>
                <h4>{item.preco}</h4>
                <h3>{item.tipo}</h3>
                <h3>Poluição média: {item.poluicao}</h3>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Produtos
