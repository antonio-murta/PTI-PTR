import './css/checkout.css';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import AddressForm from './AddressForm';
// import PaymentForm from './PaymentForm';
// import Review from './Review';


const theme = createTheme();


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        PTI/PTR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Endereço de Entrega', 'Pagamento', 'Reveja a sua encomenda'];

function getStepContent(step) {
  // switch (step) {
  //   case 0:
  //     return <AddressForm />;
  //   case 1:
  //     return <PaymentForm />;
  //   case 2:
  //     return <Review />;
  //   default:
  //     throw new Error('Unknown step');
  // }
  step = 0;
}

// const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Feeboo
          </Typography>
        </Toolbar>
      </AppBar>
      <Container  component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper className="pap" variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Grid container spacing={{xs: 4, md:2}}>
            <Grid item xs={12} sm={6}> {/* 6 = comprimento*/}
                <TextField
                  required
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
                  required
                  fullWidth
                  id="rua"
                  label="Rua"
                  name="rua"
                  autoComplete="family-name"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="Cidade"
                  name="city"
                  autoComplete="family-name"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="code"
                  label="Código-Postal"
                  name="code"
                  autoComplete="family-name"
                />
            </Grid>
          </Grid>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Obrigada pela sua encomenda.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.  {/* futura função em python */}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Anterior
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Próximo'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}