import './css/login.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright Â© '}
      <Link color="inherit">
        PTI/PTR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignIn() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Axios.post("http://localhost:3001/login", {
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="box-login"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h1> Login </h1>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField className='mail-login'
              alignItems='center'
              margin="normal"
              required
              width='100%'
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField className='mail-login'
              margin="normal"
              width='100%'
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <br></br>
            <Button className="button-login"
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {'Login'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {'Esqueci-me da Palavra-Passe'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}