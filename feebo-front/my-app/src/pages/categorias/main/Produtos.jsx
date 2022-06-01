import React, { useState } from 'react';
import './pizza.css';

const Produtos = ({ artigo }) => {
  // const [count, setCount] = useState(0);
  // const increment = () => {
  //   setCount(count + 1);
  // };

  return (
    <>
      {artigo.map((Val) => {
        return (
          <div className="caixa2">
            <div className="item mtop">
              <div className="fotos">
                <img src={Val.foto} alt="" />
              </div>
              <div className="product-details">
                <h2>{Val.name}</h2>
                <h4>{Val.preco}</h4>
                <h3>{Val.tipo}</h3>
                <h3>Poluição média: {Val.poluicao}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Produtos;
