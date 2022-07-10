import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Pagamento() {
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [numero, setNum] = useState('');
  const [val, setVal] = useState('');
  const [cv, setCv] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();


    Axios.post('http://localhost:3001/Cartao', {

      nome: name,
      numero: numero,
      validade: val,
      cvv: cv,
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    navigate('/');
  };

  return (
    <React.Fragment>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Método de Pagamento
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="cardName"
              label="Nome do cartão"
              autoComplete="cc-name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="cardNumber"
              label="Número do cartão"
              autoComplete="cc-number"
              variant="standard"
              onChange={(e) => setNum(e.target.value)}
              value={numero}
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
              onChange={(e) => setVal(e.target.value)}
              value={val}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="cvv"
              label="CVV"
              helperText="Os três últimos números"
              autoComplete="cc-csc"
              variant="standard"
              onChange={(e) => setCv(e.target.value)}
              value={cv}
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
      </Box>
    </React.Fragment>
  );
}
