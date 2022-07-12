import "./css/registar.css";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Registar() {
  let navigate = useNavigate();

  const handleClick = (event) => {
    const { myValue } = event.currentTarget.dataset;
    console.log(myValue); // --> 123
  };

  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [birthday, setBirthday] = useState("");
  const [tlm, setTlm] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nif, setNif] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3001/utilizador", {
      _id: email,
      nome: name,
      password: pwd,
      dataNasc: birthday,
      nif: nif,
      telemovel: tlm,
      morada: address,
      utipo: type,
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    navigate("/");
  };

  const handleNIF = (value) => {
    setNif(value.match(/[0-9]{9}/));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        className="box-registar"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="h1"> Registar </h1>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={{ xs: 4, md: 2 }}>
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
                label="Nome Completo"
                name="nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // required --- ver depois
                fullWidth
                variant="standard"
                id="dataNasc"
                label=" " //ver depois
                name="dataNasc"
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
                type="date"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="email"
                label="E-mail"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="telefone"
                label="Telemóvel"
                name="telefone"
                type="text"
                inputProps={{ maxLength: 9 }}
                value={tlm}
                onChange={(e) => setTlm(e.target.value)}
                // type="number"
                // onChange={(e) => handleNIF(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="nif"
                label="NIF"
                name="nif"
                value={nif}
                type="number"
                onChange={(e) => handleNIF(e.target.value)}
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  variant="standard"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Tipo"
                >
                  <MenuItem value={"Cliente"}>Cliente</MenuItem>
                  <MenuItem value={"Fornecedor"}>Fornecedor</MenuItem>
                  <MenuItem value={"Transportador"}>Transportador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            className="button"
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {"Registar"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
