import React from "react";
import logo from "../../components/assets/images/logo.png";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import "./../../App.css";

const Search = ({ CartItem }) => {
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

  // const [carrinho, addCarrinho] = useState(false);
  // const handleCarrinho = () => {
  //   addToCart(produto);
  // };

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
                <i className="fa icon-circle carrinho">
                  <BsFillCartFill size={18} />
                </i>
                <span>{CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
