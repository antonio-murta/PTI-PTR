import React, { useState, useEffect, useRef } from "react";
import logo from "../../components/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { FaBox } from "react-icons/fa";
import "./../../App.css";

const Search = ({ CartItem }) => {
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

  const [numero, setNumero] = useState([]);
  const navigate = useNavigate();

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
  let utipo = getCookie("UTipo");

  const homeTipo = () => {
    if (utipo === "Consumidor") {
      navigate("/");
    } else if (utipo === "Fornecedor") {
      navigate("/fornecedor");
    } else if (utipo === "Transportador") {
      navigate("/transportador");
    }
  };

  useEffect(() => {
    const numero = JSON.parse(localStorage.getItem("carrinho"));
    if (numero) {
      setNumero(numero);
    }
  }, [numero]);

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <a onClick={() => homeTipo()}>
              <img src={logo} alt="" />
            </a>
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Procure aqui" />
            <span>Categorias</span>
          </div>

          <div className="icon f_flex width">
            <Link to="/perfilclient">
              <i className="fa fa-user icon-circle"></i>
            </Link>
            {(utipo === "Fornecedor" || utipo === "Consumidor") && (
              <div className="cart">
                <Link to="/encomendas">
                  <i className="fa icon-circle carrinho">
                    <FaBox size={17} />
                  </i>
                </Link>
              </div>
            )}
            {utipo === "Consumidor" && (
              <div className="cart">
                <Link to="/cart">
                  <i className="fa icon-circle carrinho">
                    <BsFillCartFill size={18} />
                  </i>
                  <span>{numero.length}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
