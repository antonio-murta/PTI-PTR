import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="navlink">
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              <li>
                <Link to="/">Página Inicial</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registar">Registar</Link>
              </li>
              <li>
                <Link to="/transportador">Transportador</Link>
              </li>
              <li>
                <Link to="/fornecedor">Fornecedor</Link>
              </li>
              <li>
                <Link to="/encomenda">Encomendas</Link>
              </li>
            </ul>

            {/* <button
              className="toggle"
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fas fa-bars open"></i>
              )}
            </button> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
