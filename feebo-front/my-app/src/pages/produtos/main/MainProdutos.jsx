import React from "react"
import Produtos from "./Produtos"
import "./style-produtos.css"

const MainProdutos = ({ addToCart, infoProdutos }) => {
    return (
      <>
        <section className='shop background'>
          <div className='container d_flex'>
            <div className='contentWidth'>
              <div className='heading d_flex'>
                <h2>Nome Produto</h2>
                </div>
              <div className='product-content  grid1'>
                <Produtos addToCart={addToCart} infoProdutos={infoProdutos} />
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
  
  export default MainProdutos