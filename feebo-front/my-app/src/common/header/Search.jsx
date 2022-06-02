import React from "react";
import logo from "../../components/assets/images/logo.png";
import { Link } from "react-router-dom";

const Search = ({ CartItem }) => {
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <a href="/">
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
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
