import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
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

export default function NewArmazemModal() {
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/fornecedor");
  };

  return (
    <div className="popup">
      <Button
        style={{
          backgroundColor: "#1c5fb0",
        }}
        onClick={handleOpen}
        className="buttonNewArmazem"
        type="submit"
        variant="contained"
        sx={{ ml: 24, mt: -17.9 }}
      >
        {"Adicionar armazém"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            className="h2"
            component="h2"
          >
            Armazém adicionado com sucesso!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid>
              <Button
                style={{
                  backgroundColor: "#1c5fb0",
                }}
                className="confirm"
                type="submit"
                variant="contained"
              >
                {"Ver armazéns"}
              </Button>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
