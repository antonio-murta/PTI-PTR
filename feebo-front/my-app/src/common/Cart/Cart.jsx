import React, { useState, useEffect } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Cart = ({ CartItem, addToCart, decreaseQty, addCarrinho }) => {
  let navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("carrinho"));
    if (cartItems) {
      setCartItems(cartItems);
      dinheiroTotal();
      poluicaoTotal();
    }
  }, []);
  console.log(cartItems);

  let carrinho = JSON.parse(localStorage.getItem("carrinho"));

  function addCarrinho(produtoId) {
    carrinho.push(produtoId);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  function removerCarrinho(produtoId) {
    let temp = carrinho.filter((item) => item.id != produtoId);
    localStorage.setItem("carrinho", JSON.stringify(temp));
  }

  // dinheiro total do carrinho//
  function dinheiroTotal() {
    let temp = carrinho.map(function (item) {
      setTotal(parseFloat(item.preco));
    });

    let sum = temp.reduce(function (prev, next) {
      return prev + next;
    }, 0);
  }
  // poluicao total do carrinho //
  function poluicaoTotal() {
    let temp = carrinho.map(function (item) {
      setTotalPol(parseFloat(item.poluicao));
    });

    let sum = temp.reduce(function (prev, next) {
      return prev + next;
    }, 0);
  }
  const [total, setTotal] = useState(0);
  const [totalPol, setTotalPol] = useState(0);

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">
                Não tem produtos no seu carrinho
              </h1>
            )}

            {cartItems.map((item) => {
              // const productQty = item.price * item.qty;
              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.foto} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      {item.preco}€ * {item.qty}
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => addCarrinho(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => removerCarrinho(item.id)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Suas compras</h2>
            <div className=" d_flex">
              <h4>Valor final :</h4>
              <h3>{total}€</h3>
            </div>
            <div className=" d_flex">
              <h4>Poluição total :</h4>
              <h3>{totalPol}gCO2</h3>
            </div>
            <Button
              style={{
                backgroundColor: "#e94560",
              }}
              className="button"
              variant="contained"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
