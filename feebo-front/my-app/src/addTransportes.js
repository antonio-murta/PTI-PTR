import "./css/perfil.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Axios from "axios";

const theme = createTheme({ palette: { primary: red } });

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {/* {'Copyright © '} */}
      <Link color="inherit">PTI/PTR</Link> {new Date().getFullYear()}
      {/* {'.'} */}
    </Typography>
  );
}

export default function SignUp() {
  const [matricula, setMatricula] = useState("");
  const [polution, setPolution] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  console.log(matricula);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // preferencialmente, usar sempre axios em vez de fetch!! :)
    Axios.post("http://localhost:3001/utilizador/:id/veiculo", {
      matricula: matricula,
      poluicao: polution,
      marca: brand,
      modelo: model,
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
    // <ThemeProvider theme={theme}>
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
            {" "}
            {/* numero de "blocos"*/}
            <Grid item xs={12} sm={6}>
              {" "}
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
                onChange={(e) => setPolution(e.target.value)}
                value={polution}
                autoFocus
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
                autoFocus
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
          <Button
            className="buttonT"
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            {"Adicionar Veículo"}
          </Button>
          {/* <button onClick={handleCreate}>
                  Click me
            </button> */}

          {/* <Grid container >
              <Grid item xs>
                <Link href="#" variant="body2">
                  Já tem uma conta? Faça Login
                </Link>
              </Grid>
            </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    /* </ThemeProvider> */
  );
}
