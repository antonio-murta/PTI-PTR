import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import './css/perfil.css';
import axios from 'axios';
import { BiTrash } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';

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

const client = axios.create({

  baseURL: 'http://localhost:3001/veiculo/',

});

export default function DeleteVeiculoModal() {
  let location = useLocation();
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteVeiculo = async (id) => {
    try {
      await client.delete(`${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(location.state.id);
  return (
    <div>
      <Button
        style={{
          backgroundColor: '#ff014f',
        }}
        onClick={handleOpen}
        className="buttonDel"
        type="submit"
        variant="contained"
      >
        {'Eliminar Veículo'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deseja eliminar este veículo permanentemente?
          </Typography>
          <div className="deletemodal">
            <button
              className="trash"
              onClick={() => {
                deleteVeiculo(location.state.id);
                navigate('/transportador');
              }}
            >
              <BiTrash size={20} className="lixo" />
              SIM, APAGAR
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
