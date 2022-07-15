import "./css/perfil.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddVeiculo() {
  let navigate = useNavigate();

  const [matricula, setMatricula] = useState("");
  const [polution, setPolution] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const handleMatricula = (value) => {
    setMatricula(
      value
        .toUpperCase()
        .replace(/\s/g, "")
        .match(/[A-Za-z0-9]{1,2}/g)
        ?.join("-")
        .substr(0, 8) || ""
    );
  };
  const handlePolution = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPolution(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // preferencialmente, usar axios em vez de fetch!! :)
    axios
      .post("http://localhost:3001/utilizador/veiculo", {
        matricula: matricula,
        poluicao: polution,
        marca: brand,
        modelo: model,
        utilizacao: "no",
      })
      .then(
        (response) => {
          console.log(response.data.split(",")[1]);

          function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(";");
            for (let i = 0; i < ca.length; i++) {
              let c = ca[i];
              while (c.charAt(0) == " ") {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          }

          let loggedUser = getCookie("UserName");

          const updateVeiculo = async (id) => {
            try {
              await axios
                .put(
                  "http://localhost:3001/utilizador/" + loggedUser + "/veiculo",
                  {
                    _id: id,
                  }
                )
                .then((response) => {
                  console.log(response);
                });
            } catch (error) {
              console.log(error);
            }
          };

          updateVeiculo(response.data.split(",")[1]);
          navigate("/transportador");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        className="box-perfil"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="h1">Veículo</h1>

        <Box
          className="add"
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={{ xs: 4, md: 4 }}>
            {/* numero de "blocos"*/}
            <Grid item xs={12} sm={6}>
              {/* 6 = comprimento*/}
              <TextField
                required
                fullWidth
                variant="standard"
                id="matricula"
                label="Matrícula"
                name="matricula"
                placeholder="XX-XX-XX"
                onChange={(e) => handleMatricula(e.target.value)}
                value={matricula}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="poluicao"
                label="Poluição"
                name="poluicao"
                onChange={(e) => handlePolution(e)}
                value={polution}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                id="marca"
                label="Marca"
                name="marca"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                name="modelo"
                label="Modelo"
                id="modelo"
                onChange={(e) => setModel(e.target.value)}
                value={model}
              />
            </Grid>
            <Button
              style={{
                backgroundColor: "#1c5fb0",
              }}
              className="buttonNewArmazem"
              type="submit"
              variant="contained"
            >
              {"Adicionar veículo"}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
