import React, { useState } from 'react';
import './pizza.css';
import { useNavigate } from 'react-router-dom';

// npm install semantic-ui-react
const Produtos = ({ artigo }) => {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {artigo.map((Val, index) => {
        return (
          <div
            onClick={() => {
              navigate('/produto', {
                state: {
                  name: Val.name,
                  preco: Val.preco,
                  tipo: Val.tipo,
                  subtipo: Val.subtipo,
                  foto: Val.foto,
                  poluicao: Val.poluicao,
                },
              });
            }}
            key={index}
            className="box"
          >
            <div className="caixa2">
              <div className="item mtop">
                <div className="fotos">
                  <img src={Val.foto} alt="" />
                </div>
                <div className="product-details">
                  <h2>{Val.name}</h2>
                  <h4>{Val.preco}</h4>
                  <h3>{Val.tipo}</h3>
                  <h3>{Val.subtipo}</h3>
                  <h3>Poluição média: {Val.poluicao}</h3>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Produtos;
