import React, { useState } from 'react';
import './pizza.css';
import { useNavigate } from 'react-router-dom';

// npm install semantic-ui-react
// const Produtos = ({ artigo }) => {
const Produtos = ({ artigo, produtos }) => {

  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {produtos.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate('/produto', {
                state: {
                  id: val._id,
                  name: val.name,
                  preco: val.preco,
                  tipo: val.tipo,
                  subtipo: val.subtipo,
                  foto: val.foto,
                  poluicao: val.poluicao,
                },
              });
            }}
            key={index}
            className="box"
          >
            <div className="caixa2">
              <div className="item mtop">
                <div className="fotos">
                  <img src={val.foto} alt="" />
                </div>
                <div className="product-details">
                  <h2>{val.name}</h2>
                  <h4>{val.preco}</h4>
                  <h3>{val.tipo}</h3>
                  <h3>{val.subtipo}</h3>
                  <h3>Poluição média: {val.poluicao}</h3>
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
