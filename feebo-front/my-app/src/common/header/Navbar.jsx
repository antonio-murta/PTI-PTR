import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false);

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
              {utipo === "Transportador" && (
                <li>
                  <Link to="/transportador">Transportador</Link>
                </li>
              )}

              {utipo === "Fornecedor" && (
                <li>
                  <Link to="/fornecedor">Fornecedor</Link>
                </li>
              )}

              <li>
                <Link to="/encomendas">Encomendas</Link>
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
