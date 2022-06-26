import React, { useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { useNavigate } from 'react-router';
import './style-transporte.css';

const Transportes = ({ infoTransportes, addToCart, transportes }) => {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {transportes.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate('/utilizador/veiculo', {
                state: {
                  id: val._id,
                  name: val.marca,
                  modelo: val.modelo,
                  poluicao: val.poluicao,
                },
              });
            }}
            key={index}
            className="box"
          >
            <div className="transport mtop">
              <div className="product-details">
                <h3>{val.name}</h3>
                <h3>Saída: {val.estado}</h3>
                <h3>Chegada prevista: {val.encomenda}</h3>
                <div className="settings">
                  <button onClick={() => addToCart(val)}>
                    <div className="setts">
                      <CgTrash />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Transportes;
