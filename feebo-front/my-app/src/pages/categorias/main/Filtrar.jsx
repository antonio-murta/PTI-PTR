import React, { useState } from "react";
import "./pizza.css";

const Filtro = ({
  filterArtigo,
  setArtigo,
  categoriaArtigo,
  Produtos,
  artigo,
}) => {
  const data = [
    {
      cateName: "Preço inferior a 20€",
    },
    {
      cateName: "Poluição média inferior a 1kg",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
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
                      <div className="box f_flex">
                        <button onClick={() => filterArtigo(Val)} key={id}>
                          {Val}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {data.map((value, index) => {
              return (
                <div className="box f_flex" key={index}>
                  <button>{value.cateName}</button>
                </div>
              );
            })}

            <div className="box f_flex">
              <button onClick={() => Produtos(artigo)}>Todos</button>
            </div>
            <div className="box see-more">
              <button>Comparar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filtro;
