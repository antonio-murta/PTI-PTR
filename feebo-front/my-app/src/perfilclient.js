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
import DeleteAccountModal from "./DeleteAccountModal";
import { useNavigate } from "react-router";

const theme = createTheme({ palette: { primary: red } });

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit">PTI/PTR</Link> {new Date().getFullYear()}
    </Typography>
  );
}
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

function logOut() {
  let Token = getCookie("Token");
  setCookie("UTipo", "", 1);
  setCookie("UserName", "", 1);
  if (Token != "") {
    document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("Logged out, see you soon ;)");
  } else {
    alert("Please login first.");
  }
}

export default function SignUp() {
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let username = getCookie("UserName");

    const data = new FormData(event.currentTarget);

    fetch(
      "http://localhost:3001/utilizador/" + username,

      {
        method: "PUT",
        body: JSON.stringify({
          nome: data.get("name"),
          morada: data.get("morada"),
          telemovel: data.get("telefone"),
          passwordEscrita: data.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      // .then(res => res.json)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });

    document.getElementById("password").value = "";
  };

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

  function obterDados(parent, el) {
    let username = getCookie("UserName");
    fetch(
      "http://localhost:3001/utilizador/" + username,

      // localStorage.getItem("LoggedIn"),
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

        <Box
          className="gridBox"
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={{ xs: 4, md: 4 }}>
            <Grid item xs={12} sm={6}>
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
              <label>Telem??vel</label>
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
              <label>Morada</label>
              <TextField
                fullWidth
                variant="standard"
                id="morada"
                name="morada"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6} ml={18}>
              <label>Password</label>
              <TextField
                fullWidth
                variant="standard"
                id="morada"
                type="password"
                name="morada"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6} ml={4} className="confirmarAlteracoes">
              <Button
                style={{
                  backgroundColor: "#1c5fb0",
                }}
                className="button2"
                type="submit"
                variant="contained"
              >
                {"Confirmar altera????es"}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <ChangePwdModal />
        <DeleteAccountModal />
        <button
          onClick={() => {
            logOut();
            navigate("/login");
          }}
        >
          LogOut
        </button>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    /* </ThemeProvider> */
  );
}
