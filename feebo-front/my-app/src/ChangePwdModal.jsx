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
  border: "2.5px solid #ff014f",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function ChangePwdModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="h2">
            Alterar password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="currentPwd">
              <Grid item xs={12} sm={6}>
                <label>Password atual</label>
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
            <div className="newPwd">
              <Grid item xs={12} sm={6}>
                <label>Nova password</label>
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
            <div className="newPwd">
              <Grid item xs={12} sm={6}>
                <label>Confirmar nova password</label>
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
