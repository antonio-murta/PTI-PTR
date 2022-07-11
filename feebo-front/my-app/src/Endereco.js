import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Endereco() {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className='h7'>
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
            // value={name}
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
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Usar este endereço para detalhes de pagamento"
          />
        </Grid>
      </Grid>
      <br></br>
      <Typography variant="h6" gutterBottom className='h7'>
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
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Relembrar cartão de crédito"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}