import React, { useState } from "react";
import "./ProdutoIndividual.css";
import { useLocation } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { HiHeart } from "react-icons/hi";

const BoxProdutos = () => {
  let location = useLocation();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  console.log(location.state);
  return (
    <>
      <section className="shop background">
        <div className="cont">
          <div className="contentWidth">
            <div className="caixa">
              <div className="heading">
                <h2>{location.state.name}</h2>
              </div>
              <div className="type">
                {location.state.tipo} {">"} {location.state.subtipo}
              </div>
              <div>
                <img src={location.state.foto} className="foto" />
              </div>
              <div className="favorito">
                <div className="heart">
                  {click ? (
                    <HiHeart size={25} onClick={handleClick} />
                  ) : (
                    <HiOutlineHeart size={25} onClick={handleClick} />
                  )}
                </div>
                <div className="textofav">{"Wishlist"}</div>
              </div>

              <p className="price">{location.state.preco}</p>
              <p>Poluição: {location.state.poluicao}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoxProdutos;
