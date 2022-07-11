import "./css/checkout.css";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      PTI/PTR {new Date().getFullYear()}
    </Typography>
  );
}

export default function Checkout() {
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
            Obrigada pela sua encomenda.
          </Typography>
          <Typography variant="subtitle1">
            O seu número de encomenda é #2001539.
          </Typography>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
