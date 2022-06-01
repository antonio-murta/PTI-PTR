import "./css/perfil.css";
import * as React from "react";
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
import ChangePwdModal from "./ChangePwdModal";

const theme = createTheme({ palette: { primary: red } });

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit">
        PTI/PTR
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

// const theme = createTheme();

export default function SignUp() {

const handleSubmit = (event) => {

  console.log("qqqq")
  event.preventDefault();

  // et result = bcrypt.compare(password, texto.password).valueOf();

  const data = new FormData(event.currentTarget);
  console.log( data.get('name'))

  
  fetch('http://localhost:3001/utilizador/' + localStorage.getItem("LoggedIn"),
      {
        method: "PUT",
        body: JSON.stringify({

          nome: data.get('name'),
          morada: data.get('morada'),
          telemovel: data.get('telefone'),
          passwordEscrita: data.get('password')

        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });

    // window.location.href = "./login";
  };

  function obterDados(parent, el) {
    fetch(
      "http://localhost:3001/utilizador/" + localStorage.getItem("LoggedIn"),
      { method: "GET" }
    )
      .then((response) => response.text())
      .then((texto) => {
        texto = JSON.parse(texto);
        const nome = texto.nome;
        const email = texto._id;
        const telemovel = texto.telemovel;
        const nif = texto.nif;
        const morada = texto.morada;
        const dataNascAux = texto.dataNasc;
        const dataNasc = dataNascAux.split("T");

        document.getElementById("name").value = nome;
        document.getElementById("email").value = email;
        document.getElementById("email").disabled = true;
        document.getElementById("telefone").value = telemovel;
        document.getElementById("NIF").value = nif;
        document.getElementById("NIF").disabled = true;
        document.getElementById("morada").value = morada;
        document.getElementById("date").value = dataNasc[0];
        document.getElementById("date").disabled = true;
      })
      .catch((err) => console.log(err.message));
  }
  window.onload = obterDados();


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
        <h1 className="h1"> Editar Perfil</h1>
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
        {/* <Typography component="h1" variant="h5">
            Futuro Logo
          </Typography> */}

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={{ xs: 4, md: 4 }}>
            {" "}
            {/* numero de "blocos"*/}
            <Grid item xs={12} sm={6}>
              {" "}
              {/* 6 = comprimento*/}
              <label>Nome completo</label>
              <TextField
                fullWidth
                variant="standard"
                id="name"
                name="name"
                autoComplete="given-name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Telemóvel</label>
              <TextField
                fullWidth
                variant="standard"
                id="telefone"
                name="telefone"
                type="text"
                autoComplete="telefone"
                inputProps={{ maxLength: 9 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Morada</label>
              <TextField
                fullWidth
                variant="standard"
                id="morada"
                name="morada"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>

              <label>Data de nascimento</label>
              <TextField
                fullWidth
                variant="standard"
                id="date"
                name="date"
                type="date"
                autoComplete="family-name"
                disabled="disabled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>E-mail</label>
              <TextField
                fullWidth
                variant="standard"
                id="email"
                name="email"
                type="email"
                disabled="disabled"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>NIF</label>
              <TextField
                fullWidth
                variant="standard"
                id="NIF"
                name="NIF"
                type="text"
                autoComplete="NIF"
                disabled="disabled"
                inputProps={{ maxLength: 9 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Password</label>
              <TextField
                fullWidth
                variant="standard"
                name="password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Grid>
            <ChangePwdModal />
            <Button
              className="button2"
              type="submit"
              variant="contained"
              sx={{ mt: 5, ml: 2 }}
            >
              {"Confirmar alterações"}
            </Button>
            <ThemeProvider theme={theme}>
              <Button
                className="button3"
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
                color="primary"
              >
                {"Eliminar Conta"}
              </Button>
            </ThemeProvider>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    /* </ThemeProvider> */
  );
}
