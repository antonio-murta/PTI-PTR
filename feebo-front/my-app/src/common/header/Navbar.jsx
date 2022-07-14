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
      <header className="header"></header>
    </>
  );
};

export default Navbar;
