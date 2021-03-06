import React, { useState, useEffect } from "react";
import "./ProdutoIndividual.css";
import { useLocation } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { HiHeart } from "react-icons/hi";
import { BsCartPlus } from "react-icons/bs";
import { BsCartXFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const BoxProdutos = ({ addToCart, addCarrinho }) => {
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

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  let loggedUser = getCookie("UserName");

  let carrinho = JSON.parse(localStorage.getItem("carrinho"));

  function addCarrinho(produtoId) {
    carrinho.push(produtoId);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  const handleClickCart = () => {
    setClickCart(!clickCart);
    let itemCarrinho = location.state;
    let pair = { cliente: loggedUser };
    itemCarrinho = { ...itemCarrinho, ...pair };
    addCarrinho(itemCarrinho);
    console.log(itemCarrinho);
  };

  console.log(location.state.id);
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>
      <section className="shop background">
        <div className="cont">
          <div className="contentWidth">
            <div className="caixa">
              <Link to="/categoria">
                <BsFillArrowLeftCircleFill className="arrow" size={25} />{" "}
              </Link>
              <div className="title">
                <h2>{location.state.nome}</h2>
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

              <p className="price">{location.state.preco}???</p>
              <p className="price">{location.state.name}</p>

              <p>Polui????o: {location.state.poluicao}gCO2/km</p>
              <p>Tipo: {location.state.tipo}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoxProdutos;
