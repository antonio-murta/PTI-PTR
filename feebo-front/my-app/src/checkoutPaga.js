import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Pagamento() {
  return (
    <React.Fragment>
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