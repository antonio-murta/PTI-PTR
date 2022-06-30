import "./css/perfil.css";
import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Axios from "axios";

export default function AddVeiculo() {
  const [matricula, setMatricula] = useState("");
  const [polution, setPolution] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const handleMatricula = (value) => {
    setMatricula(
      value
        .toUpperCase()
        .replace(/\s/g, "")
        .match(/[A-Za-z0-9]{1,2}/g)
        ?.join("-")
        .substr(0, 8) || ""
    );
  };
  const handlePolution = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPolution(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(matricula, polution, brand, model);

    // preferencialmente, usar sempre axios em vez de fetch!! :)
    Axios.post("http://localhost:3001/utilizador/veiculo", {
      matricula: matricula,
      poluicao: polution,
      marca: brand,
      modelo: model,
      utilizacao: "no",
    }).then(
      (response) => {
        console.log(response);
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
        <h1 className="h1">Veículo</h1>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={{ xs: 4, md: 4 }}>
            {/* numero de "blocos"*/}
            <Grid item xs={12} sm={6}>
              {/* 6 = comprimento*/}
              <TextField
                required
                fullWidth
                variant="standard"
                id="matricula"
                label="Matrícula"
                name="matricula"
                placeholder="XX-XX-XX"
                onChange={(e) => handleMatricula(e.target.value)}
                value={matricula}
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="marca"
                label="Marca"
                name="marca"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                name="modelo"
                label="Modelo"
                id="modelo"
                onChange={(e) => setModel(e.target.value)}
                value={model}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
