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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function AddArmazem() {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [polution, setPolution] = useState("");
  const [type, setType] = useState("");
  const [product, setProduct] = useState("");
  const [phone, setPhone] = useState("");

  const handlePhone = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
  };

  const handlePolution = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPolution(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, address, polution, phone, product, type);

    // preferencialmente, usar sempre axios em vez de fetch!! :)
    Axios.post("http://localhost:3001/armazem", {
      nome: name,
      morada: address,
      poluicao: polution,
      telemovel: phone,
      tipo: type,
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
        <h1 className="h1">Armazém</h1>

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
                autoComplete="given-name"
                autoFocus
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
                onChange={(e) => handlePolution(e)}
                value={polution}
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="morada"
                label="Morada"
                name="morada"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="tel"
                label="Telemóvel"
                name="tel"
                onChange={(e) => handlePhone(e)}
                value={phone}
                inputProps={{ maxLength: 9 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tipo de Produto
                </InputLabel>
                <Select
                  required
                  variant="standard"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Tipo"
                >
                  <MenuItem value={"CasaJardim"}>Casa e Jardim</MenuItem>
                  <MenuItem value={"Eletronicos"}>Eletrónicos</MenuItem>
                  <MenuItem value={"Roupa"}>Roupa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Produto</InputLabel>
                <Select
                  required
                  variant="standard"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  label="Tipo"
                >
                  <MenuItem value={"Camisa"}>Camisa</MenuItem>
                  <MenuItem value={"Casaco"}>Casaco</MenuItem>
                  <MenuItem value={"Vestido"}>Vestido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid>
            <Button
              style={{
                backgroundColor: "#1c5fb0",
              }}
              className="buttonNewArmazem"
              type="submit"
              variant="contained"
              sx={{ ml: 24, mt: -17.9 }}
            >
              {"Adicionar armazém"}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
