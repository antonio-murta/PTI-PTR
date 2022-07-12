import React, { useState } from 'react';
import './pizza.css';
import InfoProdutos from './InfoProdutos';

const Filtro = ({
  filterArtigo,
  categoriaArtigo,
  filtrarPol,
  poluicaoFiltrada,
  filtrarPreco,
  precoFiltrado,
  Produtos,
  setArtigo,
  artigo,
  produtos,
  setProdutos,
  todosprodutos,
}) => {
  const data = [
    {
      cateName: 'x ixi',
    },
    {
      cateName: 'Poluição média inferior a 1kg',
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  return (
    <>
      <div className="notifications1">
        <div className="chead d_flex">
          <h1>Filtros</h1>
        </div>
        <div className="notification1-container">
          <div className="boxes">
            <div className="box f_flex">
              <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
                Tipo
              </button>
              {isOpen && (
                <div className="cena">
                  {categoriaArtigo.map((Val, id) => {
                    return (
                      <div
                        key={id}
                        onClick={() => filterArtigo(Val)}
                        className="box f_flex"
                      >
                        <button key={id}>{Val}</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="box f_flex">
              <button className="toggle" onClick={() => setIsOpen1(!isOpen1)}>
                Valores de Poluição
              </button>
              {isOpen1 && (
                <div className="cena">
                  {poluicaoFiltrada.map((Val, id) => {
                    return (
                      <div
                        key={id}
                        onClick={() => filtrarPol(Val)}
                        className="box f_flex"
                      >
                        <button key={id}>{Val} CO2/km</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="box f_flex">
              <button className="toggle" onClick={() => setIsOpen2(!isOpen2)}>
                Preço
              </button>
              {isOpen2 && (
                <div className="cena">
                  {precoFiltrado.map((Val, id) => {
                    return (
                      <div
                        key={id}
                        onClick={() => filtrarPreco(Val)}
                        className="box f_flex"
                      >
                        <button key={id}>{Val}€</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* {data.map((value, index) => {
              return (
                <div className="box f_flex" key={index}>
                  <button>{value.cateName}</button>
                </div>
              );
            })} */}

            <div
              onClick={() => setProdutos(todosprodutos)}
              className="box see-more"
            >
              <button>Todos</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filtro;
