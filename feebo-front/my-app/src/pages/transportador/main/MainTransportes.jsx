import Notifications from './Notifications';
import Transportes from './Transportes';
import './style-transporte.css';
import { TiPlus } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const MainTransportes = ({ addToCart, infoTransportes }) => {
  let navigate = useNavigate();

  /*****************************************/
  /*            fetching veiculos          */
  /*****************************************/
  const [veiculos, setVeiculos] = useState([]);
  const [todosVeiculos, setTodosVeiculos] = useState([]);
  useEffect(() => {

    Axios.get('http://localhost:3001/veiculos').then((res) => {

      setVeiculos(res.data);
      setTodosVeiculos(res.data);
    });
  }, []);
  console.log(veiculos);
  return (
    <>
      <section className="shop background">
        <div className="container d_flex">
          <Notifications />
          <div className="contentWidth">
            <div className="heading d_flex">
              <h2>Veículos</h2>
              <div className="new-transport">
                <button onClick={() => navigate('/addTransportes')}>
                  <div className="plus-icon">
                    <TiPlus />
                  </div>
                  Novo Veículo
                </button>
              </div>
            </div>
            <div className="product-content  grid1">
              <Transportes
                addToCart={addToCart}
                infoTransportes={infoTransportes}
                veiculos={veiculos}
                setVeiculos={setVeiculos}
                todosVeiculos={todosVeiculos}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainTransportes;
