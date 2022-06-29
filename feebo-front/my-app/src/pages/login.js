import "./css/login.css";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { Link as routerLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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

function checkCookie() {
  let Token = getCookie("Token");
  let username = getCookie("UserName");
  if (Token != "") {
    alert("Welcome again " + username);
  } else {
    alert("Please login first.");
  }
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

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (event) => {
    let Token = getCookie("Token");
    const from = location.state?.from?.pathname || "/";

    if (Token != "") {
      alert("Already logged in.");
    } else {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get("email");

      fetch("http://localhost:3001/utilizador/login", {
        method: "POST",
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.text();
        })
        .then(function (text) {
          setCookie("Token", text, 1);
          const UserName = text.split(";")[0];
          setCookie("UserName", UserName, 1);

          navigate(from, { replace: true });

          axios.get("http://localhost:3001/utilizador").then(
            (response) => {
              console.log(response.data);
              const utilizador = response.data.filter(
                (user) => user._id === getCookie("UserName")
              );
              const uTipo = utilizador[0].utipo;
              setCookie("UTipo", uTipo, 1);
              console.log(uTipo);
            },
            (error) => {
              console.log(error);
            }
          );

          alert(text);
          alert(UserName);

          alert("Logged In :D");
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        className="box-login"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="h1">
          Login <button onClick={checkCookie}>Check If Logged In</button>{" "}
          <button onClick={logOut}>LogOut</button>
        </h1>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            className="mail-login"
            alignItems="center"
            margin="normal"
            required
            variant="standard"
            width="100%"
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            className="mail-login"
            margin="normal"
            required
            width="100%"
            variant="standard"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <br></br>
          <Button
            className="button-login"
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {"Login"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {"Esqueci-me da Palavra-Passe"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
