import "./css/checkout.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import Axios from "axios";

const theme = createTheme();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      PTI/PTR {new Date().getFullYear()}
    </Typography>
  );
}

export default function Checkout() {
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

  let cliente = getCookie("UserName");

  /*****************************************/
  /*           fetching encomendas         */
  /*****************************************/
  const [encomendas, setEncomendas] = useState([]);
  const [todasEncomendas, setTodasEncomendas] = useState([]);
  const [encomendaID, setEncomendaID] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/encomendas").then((res) => {
      setEncomendas(res.data);
      setTodasEncomendas(res.data);

      let encomendas_filtradas = res.data.filter(
        (encomenda) => encomenda.cliente === cliente
      );

      setEncomendaID(encomendas_filtradas.pop()._id);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" className="h1" align="center">
            Checkout
          </Typography>

          <Typography variant="h5" gutterBottom>
            Obrigado pela sua encomenda!
          </Typography>
          <Typography variant="subtitle1">
            O seu número de encomenda é {encomendaID}.
          </Typography>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
