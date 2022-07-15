import "./css/perfil.css";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddProduto() {
  const [name, setName] = useState("");
  const [polution, setPolution] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [origin, setOrigin] = useState("");
  const [provider, setProvider] = useState("");
  const [type, setType] = useState("");
  const [subtype, setSubtype] = useState("");

  let location = useLocation();
  let navigate = useNavigate();

  console.log(location.state.armazem);
  console.log(location.state.fornecedor);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, polution, price, qty, origin, type, subtype);

    // preferencialmente, usar sempre axios em vez de fetch!! :)

    Axios.post("http://localhost:3001/produto", {
      nome: name,
      poluicao: polution,
      preco: price,
      quantidade: qty,
      armazem: location.state.armazem,
      fornecedor: location.state.fornecedor,
      tipo: type,
      subtipo: subtype,
    }).then(
      (response) => {
        console.log(response);
        navigate("/fornecedor");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        className="box-perfil"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="h1">Produto</h1>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={{ xs: 4, md: 4 }}>
            {" "}
            {/* numero de "blocos"*/}
            <Grid item xs={12} sm={6}>
              {" "}
              {/* 6 = comprimento*/}
              <TextField
                required
                fullWidth
                variant="standard"
                id="nome"
                label="Nome"
                name="nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="preco"
                label="Preço"
                name="preco"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="poluicao"
                label="Poluição"
                name="poluicao"
                onChange={(e) => setPolution(e.target.value)}
                value={polution}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="qty"
                label="Quantidade Inicial"
                name="qty"
                onChange={(e) => setQty(e.target.value)}
                value={qty}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  variant="standard"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Tipo"
                >
                  <MenuItem value={"Roupa"}>Roupa</MenuItem>
                  <MenuItem value={"Comida"}>Comida</MenuItem>
                  <MenuItem value={"Higiene"}>Higiene</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subtipo</InputLabel>
                <Select
                  variant="standard"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subtype}
                  onChange={(e) => setSubtype(e.target.value)}
                  label="Subipo"
                >
                  <MenuItem value={"Camisa"}>Fruta</MenuItem>
                  <MenuItem value={"Casaco"}>Carne</MenuItem>
                  <MenuItem value={"Vestido"}>Doces</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid>
            <Button
              className="button"
              type="submit"
              variant="contained"
              sx={{ mt: 5 }}
            >
              {"Adicionar Produto"}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
