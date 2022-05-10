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
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';


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

  return (
    // <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="box"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h1  className="h1">Transporte</h1>
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          {/* <Typography component="h1" variant="h5">
            Futuro Logo
          </Typography> */}
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={{xs: 4, md:4}}> {/* numero de "blocos"*/}
              <Grid item xs={12} sm={6} > {/* 6 = comprimento*/}
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  id="matricula"
                  label="Matrícula"
                  name="matricula"
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
                  id="marca"
                  label="Marca"
                  name="marca"
                  autoComplete="given-name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  name="modelo"
                  label="Modelo"
                  id="modelo"
                  autoComplete="family-name"
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
              {'Adicionar Transporte'}
            </Button>
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
            {/* <Grid container >
              <Grid item xs>
                <Link href="#" variant="body2">
                  Já tem uma conta? Faça Login
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    /* </ThemeProvider> */
  );
}