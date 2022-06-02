import './css/perfil.css';
import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red} from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
// import Checkbox from '@mui/material/Checkbox'
// import { FormControlLabel } from '@mui/material';


const theme = createTheme({ palette: { primary: red } });

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {/* {'Copyright © '} */}
      <Link color="inherit" href="https://mui.com/">
        PTI/PTR
      </Link>{' '}
      {new Date().getFullYear()}
      {/* {'.'} */}
    </Typography>
  );
}

// const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [tlm, setTlm] = useState();

  const handleTlm = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setTlm(value);
  };

  return (
    // <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="box-perfil"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h1  className="h1">Armazém</h1>
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={{xs: 4, md:4}}> {/* numero de "blocos"*/}
              <Grid item xs={12} sm={6} > {/* 6 = comprimento*/}
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  id="nome"
                  label="Nome"
                  name="nome"
                  autoComplete="given-name"
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
                  autoComplete="given-name"
                  autoFocus
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
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  required
                  fullWidth
                  variant="standard"
                  id="tel"
                  label="Telemóvel"
                  name="tel"
                  inputProps={{ maxLength: 9 }}
                  value={tlm}
                  onChange={handleTlm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipo de Prodruto</InputLabel>
                    <Select
                      variant="standard"
                    // setSelectValue
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={Tipo}
                      label="Tipo"
                      // onChange={handleChange}
                    >
                    <MenuItem  value={"CasaJardim"}>Casa e Jardim</MenuItem>
                    <MenuItem  value={"Eletronicos"}>Eletrónicos</MenuItem>
                    <MenuItem  value={"Roupa"}>Roupa</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Prodruto</InputLabel>
                    <Select
                      variant="standard"
                    // setSelectValue
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={Tipo}
                      label="Tipo"
                      // onChange={handleChange}
                    >
                    <MenuItem  value={"Camisa"}>Camisa</MenuItem>
                    <MenuItem  value={"Casaco"}>Casaco</MenuItem>
                    <MenuItem  value={"Vestido"}>Vestido</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
            </Grid>
            {/* <button onClick={handleCreate}>
                  Click me
            </button> */}
            <Grid>
            <Button className="button"
              type="submit"
              variant="contained"
              sx={{ mt: 5 }}
            >
              {'Adicionar Armazém'}
            </Button>
            {/* <Button className="button"
              type="submit"
              variant="contained"
              sx={{ mt: 5, ml: 2}}
            >
              {'Continuar sem Produtos'}
            </Button> */}
            {/* <ThemeProvider theme={theme}>
              <Button className="button2"
              type="submit"
              variant="contained"
              sx={{ mt: 5, ml:2}}
              color="primary"
              >
              {'Eliminar Conta'} */}
                {/* tentar descobrir como meter o botão vermelho */}
              {/* </Button>
            </ThemeProvider> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    /* </ThemeProvider> */
  );
}

