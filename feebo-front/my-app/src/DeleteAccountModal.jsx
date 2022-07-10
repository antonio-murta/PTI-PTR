import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import './css/perfil.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #ff014f',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

export default function DeleteAccountModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch(
      'http://localhost:3001/utilizador/' + localStorage.getItem('LoggedIn'),
      {
        method: 'DELETE',
        body: JSON.stringify({
          password: data.get('password'),
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      // .then(res => res.json)
      .then(function (myJson) {
        console.log(myJson);
      });

    window.location.href = './Login';
  };

  return (
    <div>
      <Button
        style={{
          backgroundColor: '#f12735',
        }}
        onClick={handleOpen}
        className="buttonDel"
        type="submit"
        variant="contained"
        sx={{ mt: -7 }}
      >
        {'Eliminar conta'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deseja eliminar a sua conta permanentemente? Se sim, confirme a sua
            password:
          </Typography>

          <Typography
            component="form"
            noValidate
            onSubmit={handleSubmit}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <div className="currentPwd">
              <Grid className="pwd" item xs={12} sm={12}>
                <label>Password</label>
                <TextField
                  fullWidth
                  variant="standard"
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </div>
            <Grid className="botaoDelete">
              <Button
                style={{
                  backgroundColor: '#f12735',
                }}
                className="confirm"
                type="submit"
                variant="contained"
                sx={{ mt: 5, ml: 2 }}
              >
                {'Eliminar'}
              </Button>
            </Grid>
          </Typography>
          <Grid className="botaoDelete">
            <Button
              style={{
                backgroundColor: '#1c5fb0',
              }}
              className="confirm"
              type="submit"
              variant="contained"
              sx={{ mt: 5, ml: 2 }}
            >
              {'Cancelar'}
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
