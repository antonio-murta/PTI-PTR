import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import InfoArmazens from "./pages/fornecedor/mainpage/InfoArmazens";
import InfoTransportes from "./pages/transportador/main/InfoTransportes";
import InfoProdutos from "./pages/categorias/main/InfoProdutos";
import SignIn from "./pages/login";
import Registar from "./pages/registar";
import Transportador from "./pages/transportador/transportador";
import Categorias from "./pages/categorias/categorias";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Fornecedor from "./pages/fornecedor/fornecedor";
import PerfilClient from "./perfilclient";
import AddVeiculo from "./addVeiculo";
import AddArmazem from "./addArmazem";
import AddProduto from "./addProduto";
import BoxProdutos from "./pages/categorias/main/BoxProdutos";
import BoxArmazem from "./pages/fornecedor/mainpage/BoxArmazem";
import ProtectedRoutes from "./ProtectedRoutes";
import Checkout from "./checkout";
import BoxVeiculo from "./pages/transportador/main/BoxVeiculo";

function App() {
  const THEME = createTheme({
    typography: {
      fontFamily: `"Poppins", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
    },
  });
  const { productItems } = Data;
  const { shopItems } = Sdata;
  const { infoTransportes } = InfoTransportes;
  const { infoArmazens } = InfoArmazens;
  const { infoProdutos } = InfoProdutos;
  const [CartItem, setCartItem] = useState([]);

  const [artigo, setArtigo] = useState(infoProdutos);

  /*****************************************/
  /*           fetching produtos           */
  /*****************************************/
  const [produtos, setProdutos] = useState([]);
  const [todosprodutos, setTodosProdutos] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/produto/").then((res) => {
      setProdutos(res.data);
      setTodosProdutos(res.data);
    });
  }, []);

  // filtrar por tipo //
  const categoriaArtigo = [...new Set(todosprodutos.map((Val) => Val.tipo))];

  const filterArtigo = (curcat) => {
    // <<<<<<< catarina
    //     const newArtigo = infoProdutos.filter((newVal) => {
    //       console.log(newVal)
    //       console.log(curcat)
    // =======

    const newProduto = todosprodutos.filter((newVal) => {
      return newVal.tipo === curcat;
    });
    setProdutos(newProduto);
  };

  // carrinho //
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  return (
    <>
      <ThemeProvider theme={THEME}>
        <Router>
          <Header CartItem={CartItem} />
          <Routes>
            {/* <Route path="/" element={<Layout />}></Route> */}
            <Route
              path="/"
              element={
                <Pages
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  CartItem={CartItem}
                  addToCart={addToCart}
                  decreaseQty={decreaseQty}
                />
              }
            />
            <Route
              path="/login"
              element={
                <SignIn
                  CartItem={CartItem}
                  addToCart={addToCart}
                  decreaseQty={decreaseQty}
                />
              }
            />
            <Route
              path="/registar"
              element={
                <Registar
                  CartItem={CartItem}
                  addToCart={addToCart}
                  decreaseQty={decreaseQty}
                />
              }
            />
            <Route
              path="/categoria"
              element={
                <Categorias
                  productItems={productItems}
                  addToCart={addToCart}
                  infoProdutos={infoProdutos}
                  artigo={artigo}
                  categoriaArtigo={categoriaArtigo}
                  filterArtigo={filterArtigo}
                  setArtigo={setArtigo}
                  // addToCompare={addToCompare}
                  // removeFromCompare={removeFromCompare}
                  // selected={selected}
                  produtos={produtos}
                  setProdutos={setProdutos}
                  todosprodutos={todosprodutos}
                />
              }
            />
            <Route element={<ProtectedRoutes allowedRoles={"Transportador"} />}>
              <Route
                path="/transportador"
                element={
                  <Transportador
                    productItems={productItems}
                    addToCart={addToCart}
                    infoTransportes={infoTransportes}
                  />
                }
              />
              <Route
                path="/fornecedor"
                element={
                  <Fornecedor
                    productItems={productItems}
                    addToCart={addToCart}
                    infoArmazens={infoArmazens}
                  />
                }
              />
            </Route>
            <Route
              path="/checkout"
              element={
                <Checkout
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            />
            <Route
              path="/perfilclient"
              element={
                <PerfilClient
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            />
            <Route
              path="/addTransportes"
              element={
                <AddVeiculo
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            />
            <Route
              path="/utilizador/veiculo"
              element={
                <BoxVeiculo
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            />
            <Route
              path="/addProduto"
              element={
                <AddProduto
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            />
            <Route
              path="/produto"
              element={
                <BoxProdutos
                  productItems={productItems}
                  addToCart={addToCart}
                  infoProdutos={infoProdutos}
                />
              }
            />
            {/* <Route element={<RequireAuth />}> */}
            <Route
              path="/armazem"
              element={
                <BoxArmazem
                  productItems={productItems}
                  addToCart={addToCart}
                  infoProdutos={infoProdutos}
                />
              }
            />
            <Route
              path="/addArmazem"
              element={
                <AddArmazem
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            />
            {/* </Route> */}
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
