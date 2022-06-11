import React, { useState } from "react";
import "./ProdutoIndividual.css";
import { useLocation } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { HiHeart } from "react-icons/hi";
import { BsCartPlus } from "react-icons/bs";
import { BsCartXFill } from "react-icons/bs";

const BoxProdutos = ({ addToCart }) => {
  let location = useLocation();
  const produto = {
    id: location.state.id,
    foto: location.state.foto,
    name: location.state.name,
    preco: location.state.preco,
    poluicao: location.state.poluicao,
    tipo: location.state.tipo,
    subtipo: location.state.subtipo,
  };
  const [clickFav, setClickFav] = useState(false);
  const [clickCart, setClickCart] = useState(false);
  const handleClickFav = () => setClickFav(!clickFav);
  const handleClickCart = () => {
    setClickCart(!clickCart);
    addToCart(produto);
  };

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
                  {clickFav ? (
                    <HiHeart size={25} onClick={handleClickFav} />
                  ) : (
                    <HiOutlineHeart size={25} onClick={handleClickFav} />
                  )}
                </div>
                <div className="textofav">{"Wishlist"}</div>
                <div className="carro">
                  {clickCart ? (
                    <BsCartXFill size={24} onClick={handleClickCart} />
                  ) : (
                    <BsCartPlus size={24} onClick={handleClickCart} />
                  )}
                </div>
                <div className="textofav">{"Adicionar ao carrinho"}</div>
              </div>

              {/* <button onClick={() => addToCart(item)}></button> */}


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
