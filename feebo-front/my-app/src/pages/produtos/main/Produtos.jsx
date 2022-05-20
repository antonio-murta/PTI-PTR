import React, { useState } from "react"
import "./style-produtos.css"

const Produtos = ({ infoProdutos }) => {
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
                <div className='product-details'>
                  <h3>{item.name}</h3>
                  <h3>Preço: {item.saida}</h3>
                  <h3>Tipo: {item.chegada}</h3>
                  <h3>Subtipo: {item.chegada}</h3>
                  <h3>Poluição: {item.chegada}</h3>
                  <h3>Armazém: {item.chegada}</h3>
                  <h3>Fornecedor: {item.chegada}</h3>
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
  }
  
  export default Produtos
  