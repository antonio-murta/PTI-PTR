import './css/registar.css';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link as Link2} from "react-router-dom";
import Axios from 'axios';
import {useState, useEffect} from "react";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        PTI/PTR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

export default function Registar() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(data.get('email'))
    // Axios.post("http://localhost:3001/insert", {
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   dataNasc: data.get('dataNasc'),
    //   nome: data.get('nome'),
    //   telemovel: data.get('telefone'),
    //   morada: data.get('morada'),
    //   utipo: "consumidor"
    // });

    fetch('http://localhost:3001/utilizador',
        {
          method: "POST",
          body: JSON.stringify({
            // _id: "aaa@gmail.com",
            // nome: "Catarina",
            // dataNasc: "20.12.1234",
            // morada: "rya",
            // telemovel: 1234567,
            // password: "123",
            // utipo: "consumidor"
            email: data.get('email'),
            password: data.get('password'),
            dataNasc: data.get('dataNasc'),
            nome: data.get('nome'),
            telemovel: data.get('telefone'),
            morada: data.get('morada'),
            utipo: "consumidor"

          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });




    window.location.href = "./login";
};

const [tlm, setTlm] = useState();

const handleTlm = (e) => {
  const value = e.target.value.replace(/\D/g, "");
  setTlm(value);
};

const [nif, setNif] = useState();

const handleNif = (e) => {
  const value = e.target.value.replace(/\D/g, "");
  setNif(value);
};


  return (
    // <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="box-registar"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h1 className='h1'> Registar </h1>
          <Box onSubmit={handleSubmit} component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={{xs: 4, md:2}}> {/* numero de "blocos"*/}
              <Grid item xs={12} sm={6}> {/* 6 = comprimento*/}
                <TextField
                  required
                  fullWidth
                  id="nome"
                  label="Nome Completo"
                  name="nome"
                  autoComplete="given-name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="dataNasc"
                  //label="Data de Nascimento" //ver depois
                  name="dataNasc"
                  type="date"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                required
                fullWidth
                id="telefone"
                label="Telemóvel"
                name="telefone"
                type="text"
                autoComplete="telefone"
                inputProps={{ maxLength: 9}}
                value={tlm}
                onChange={handleTlm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                required
                fullWidth
                id="nif"
                label="NIF"
                name="nif"
                type="text"
                autoComplete="NIF"
                inputProps={{ maxLength: 9}}
                value={nif}
                onChange={handleNif}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="morada"
                  label="Morada"
                  name="morada"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                    // setSelectValue
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={Tipo}
                      label="Tipo"
                      // onChange={handleChange}
                    >
                    <MenuItem  value={"Cliente"}>Cliente</MenuItem>
                    <MenuItem  value={"Fornecedor"}>Fornecedor</MenuItem>
                    <MenuItem  value={"Transportador"}>Transportador</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
            </Grid>
            {/* <button onClick={handleCreate}>
                  Click me
            </button> */}
            <Button className="button"
              type="submit"
              //onClick={addToDataBase}
              variant="contained"
              sx={{ mt: 3, mb: 2}}
            >
              {'Registar'}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    /* </ThemeProvider> */
  );
}
