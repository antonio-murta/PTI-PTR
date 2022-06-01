import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import "./css/perfil.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ChangePwdModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);




  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch('http://localhost:3001/utilizador/' + localStorage.getItem("LoggedIn") + "/password",
      {
        method: "PUT",
        body: JSON.stringify({

          passwordAtual: data.get('passwordAtual'),
          passwordNova: data.get('passwordNova'),
          passwordConf: data.get('passwordConf')

        }),
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
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
      document.getElementById("passwordAtual").value = "";
      document.getElementById("passwordNova").value = "";
      document.getElementById("passwordConf").value = "";
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="button"
        type="submit"
        variant="contained"
        sx={{ mt: 5 }}
      >
        {"Alterar Password"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >


        <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Alterar password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="currentPwd">
              <Grid item xs={12} sm={6}>
                <label>Password atual</label>
                <TextField
                  fullWidth
                  variant="standard"
                  name="passwordAtual"
                  type="password"
                  id="passwordAtual"
                  autoComplete="new-password"
                  
                />
              </Grid>
            </div>
            <div className="newPwd">
              <Grid item xs={12} sm={6}>
                <label>Nova password</label>
                <TextField
                  fullWidth
                  variant="standard"
                  name="passwordNova"
                  type="password"
                  id="passwordNova"
                  autoComplete="new-password"
                />
              </Grid>
            </div>
            <div className="newPwd">
              <Grid item xs={12} sm={6}>
                <label>Confirmar nova password</label>
                <TextField
                  fullWidth
                  variant="standard"
                  name="passwordConf"
                  type="password"
                  id="passwordConf"
                  autoComplete="new-password"
                />
              </Grid>
            </div>
            <Button
              className="confirm"
              type="submit"
              variant="contained"
              sx={{ mt: 5, ml: 2 }}
            >
              {"Confirmar"}
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
