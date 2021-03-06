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
import {createTheme, ThemeProvider } from '@mui/material/styles';
import {red} from '@mui/material/colors';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';


const theme = createTheme({ palette: { primary: red } });

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {/* {'Copyright © '} */}
      <Link color="inherit">
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
          <h1  className="h1"> Editar Perfil - Fornecedor</h1>
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={{xs: 4, md:4}}> {/* numero de "blocos"*/}
              <Grid item xs={12} sm={6} > {/* 6 = comprimento*/}
                <TextField
                  fullWidth
                  id="name"
                  label="Nome Completo"
                  name="name"
                  autoComplete="given-name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="date"
                  label=" " //ver depois
                  name="date"
                  type="date"
                  autoComplete="family-name"
                  disabled="disabled"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled="disabled"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
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
                fullWidth
                id="telefone"
                label="Telemóvel"
                name="telefone"
                type="text"
                autoComplete="telefone"
                inputProps={{ maxLength: 9}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                id="NIF"
                label="NIF"
                name="NIF"
                type="text"
                autoComplete="NIF"
                disabled="disabled"
                inputProps={{ maxLength: 9}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="morada"
                  label="Morada"
                  name="morada"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  id="nForn"
                  label="Número de Fornecedor"
                  name="nForn"
                  autoComplete="family-name"
                  disabled="disabled"
                />
              </Grid>
            </Grid>
            {/* <button onClick={handleCreate}>
                  Click me
            </button> */}
            <Grid>
            <Button className="button"
              type="submit"
              variant="contained"
              sx={{ mt: 5}}
            >
              {'Confirmar alterações'}
            </Button>
            <ThemeProvider theme={theme}>
              <Button className="button2"
              type="submit"
              variant="contained"
              sx={{ mt: 5, ml:2}}
              color="primary"
              >
              {'Eliminar Conta'}
              </Button>
            </ThemeProvider>
            <Button className="button2"
              type="submit"
              variant="contained"
              sx={{ mt: 3}}
            >
              {'Ver armazéns'}
            </Button>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    /* </ThemeProvider> */
  );
}

