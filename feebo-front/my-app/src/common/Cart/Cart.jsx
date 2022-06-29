import React from 'react';
import './style.css';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.preco,
    0
  );

  const totalPoluicao = CartItem.reduce(
    (poluicao, item) => poluicao + item.qty * item.poluicao,
    0
  );
  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">
                Não tem produtos no seu carrinho
              </h1>
            )}

            {CartItem.map((item) => {
              // const productQty = item.price * item.qty;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.foto} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.nome}</h3>
                    <h4>
                      {item.preco}€ * {item.qty}
                      {/* <span>${productQty}.00</span> */}
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
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
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
              <h3>{totalPrice}€</h3>
            </div>
            <div className=" d_flex">
              <h4>Poluição total :</h4>
              <h3>{totalPoluicao}</h3>
            </div>
            <Button
              style={{
              backgroundColor: "#e94560",
              }}
              className="button"
              variant="contained"
            >
            {"Checkout"}
            <Link to="/checkout"></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
