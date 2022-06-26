import React, { useState } from 'react';
import './style-armazens.css';
import { useNavigate } from 'react-router-dom';

const Armazens = ({ infoArmazens, addToCart, armazens }) => {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {armazens.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate('/armazem', {
                state: {
                  id: val._id,
                  name: val.nome,
                  local: val.morada,
                  poluicao: val.poluicao,
                  telemovel: val.telemovel,
                  tipo: val.tipo,
                  produtos: val.produtos,
                },
              });
            }}
            key={index}
            className="box"
          >
            <div className="transport">
              <div className="details">
                <h2>{val.nome}</h2>
                <h3>Local: {val.morada}</h3>
                <h3>Poluição: {val.poluicao}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Armazens;
