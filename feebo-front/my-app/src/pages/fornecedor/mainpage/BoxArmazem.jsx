import React, { useState } from "react";
import "./../../categorias/main/ProdutoIndividual.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import DeleteArmazemModal from "../../../DeleteArmazemModal";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BoxArmazem = ({ produtos }) => {
  let location = useLocation();
  let navigate = useNavigate();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

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

  return (
    <>
      <section className="shop background">
        <div className="cont">
          <div className="contentWidth">
            <div className="caixa">
              <Link to="/fornecedor">
                <BsFillArrowLeftCircleFill className="arrow" size={25} />
              </Link>
              <div className="title">
                <h2>Armazém {location.state.name}</h2>
              </div>
              <div className="informacao">
                <p>Tipo: {location.state.tipo}</p>
                <p>Localização: {location.state.local}</p>
                <p>Poluição: {location.state.poluicao}gCO2/km</p>
                <p>Contacto: {location.state.telemovel}</p>
                <p>Fornecedor: {loggedUser} </p>
                <div>
                  Produtos:
                  {produtos
                    .filter(
                      (produto) => produto.armazem === location.state.name
                    )
                    .map((filteredProduto, itemIndex) => (
                      <div key={itemIndex}>
                        {filteredProduto.nome}, {filteredProduto.preco}€ (
                        {filteredProduto.quantidade})
                      </div>
                    ))}
                </div>
                <div className="new-product">
                  <button
                    onClick={() =>
                      navigate("/addProduto", {
                        state: {
                          armazem: location.state.name,
                          fornecedor: loggedUser,
                        },
                      })
                    }
                  >
                    <div className="plus-icon">
                      <AiOutlinePlus />
                    </div>
                    Novo Produto
                  </button>
                </div>
                <DeleteArmazemModal />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoxArmazem;
