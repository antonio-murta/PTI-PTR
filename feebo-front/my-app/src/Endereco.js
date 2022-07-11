import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./css/perfil.css";

export default function Endereco() {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const [card, setCard] = useState("");
  const [expire, setExpire] = useState("");
  const [cvv, setCVV] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let pagamento_list = [title, card, expire, cvv];
    console.log(pagamento_list);

    // preferencialmente, usar axios em vez de fetch!! :)
    Axios.post("http://localhost:3001/encomenda", {
      nome: name,
      morada: address,
      codigo_postal: zip,
      cidade: city,
      distrito: district,
      pais: country,
      pagamento: pagamento_list,
    }).then(
      (response) => {
        console.log(response);
        navigate("/checkoutconfirmation");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Container component="main" className="checkout">
      <Box
        className="box-checkout checkout"
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          marginTop: 2,
        }}
      >
        <div className="divisao">
          <Typography variant="h6" gutterBottom className="h7">
            Endereço
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nome"
                name="nome"
                label="Nome Completo"
                autoComplete="given-name"
                variant="standard"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="endereco"
                name="endereco"
                label="Morada"
                autoComplete="shipping address-line1"
                variant="standard"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="zip"
                name="zip"
                label="Código Postal"
                autoComplete="shipping postal-code"
                variant="standard"
                onChange={(e) => setZip(e.target.value)}
                value={zip}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="cidade"
                name="cidade"
                label="Cidade"
                autoComplete="shipping address-level2"
                variant="standard"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="distrito"
                name="distrito"
                label="Distrito"
                variant="standard"
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="country"
                name="country"
                label="País"
                autoComplete="shipping country"
                variant="standard"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveAddress" value="yes" />
                }
                label="Usar este endereço para detalhes de pagamento"
              />
            </Grid>
          </Grid>
        </div>
        <div className="divisao">
          <Typography variant="h6" gutterBottom className="h7">
            Pagamento
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cardName"
                label="Titular do cartão"
                autoComplete="cc-name"
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cardNumber"
                label="Número do cartão"
                autoComplete="cc-number"
                variant="standard"
                onChange={(e) => setCard(e.target.value)}
                value={card}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="validade"
                label="Validade"
                autoComplete="cc-exp"
                variant="standard"
                onChange={(e) => setExpire(e.target.value)}
                value={expire}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="cvv"
                label="CVV"
                autoComplete="cc-csc"
                variant="standard"
                onChange={(e) => setCVV(e.target.value)}
                value={cvv}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveCard" value="yes" />
                }
                label="Relembrar cartão de crédito"
              />
            </Grid>
          </Grid>
          <Button
            style={{
              backgroundColor: "#1c5fb0",
            }}
            className="buttonNewArmazem"
            type="submit"
            variant="contained"
          >
            {"Concluir encomenda"}
          </Button>
        </div>
      </Box>
    </Container>
  );
}
