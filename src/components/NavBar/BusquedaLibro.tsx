import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import "../../styles/BusquedaLibro.css";

interface BusquedaLibroProps {
  open: boolean;
  onClose: () => void;
}

const BusquedaLibro = ({ open, onClose }: BusquedaLibroProps) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [resultado, setResultado] = useState<string | null>(null);
  const [tipoBusqueda, setTipoBusqueda] = useState<
    "isbn" | "nombre" | "codigo" | null
  >(null);

  const libros = [
    {
      isbn: "978-3-16-148410-0",
      nombre: "Libro A",
      codigo: "123",
      disponible: true,
    },
    {
      isbn: "978-1-234-56789-0",
      nombre: "Libro B",
      codigo: "124",
      disponible: false,
    },
    {
      isbn: "978-0-123-45678-9",
      nombre: "Libro C",
      codigo: "125",
      disponible: true,
    },
  ];

  const manejarBusqueda = () => {
    try {
      if (!tipoBusqueda) {
        setResultado("Por favor, selecciona un tipo de búsqueda.");
        return;
      }

      const libroEncontrado = libros.find((libro) => {
        switch (tipoBusqueda) {
          case "isbn":
            return libro.isbn.includes(terminoBusqueda);
          case "nombre":
            return libro.nombre
              .toLowerCase()
              .includes(terminoBusqueda.toLowerCase());
          case "codigo":
            return libro.codigo.includes(terminoBusqueda);
          default:
            return false;
        }
      });

      if (libroEncontrado) {
        setResultado(
          `Libro encontrado: ${libroEncontrado.nombre} (${libroEncontrado.isbn}) - ${libroEncontrado.disponible ? "Disponible" : "No disponible"}`
        );
      } else {
        setResultado(
          "No se encontró ningún libro con ese término de búsqueda."
        );
      }
    } catch (error) {
      setResultado(
        "Error al realizar la búsqueda. Intenta nuevamente más tarde."
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent className="dialog-content">
        <Box className="container">
          {tipoBusqueda === null ? (
            <Box>
              <Typography variant="h6" className="typography-header">
                ¿Cómo deseas buscar?
              </Typography>
              <FormControl component="fieldset" className="form-control">
                <RadioGroup
                  onChange={(e) =>
                    setTipoBusqueda(
                      e.target.value as "isbn" | "nombre" | "codigo"
                    )
                  }
                  row
                  className="radio-group"
                >
                  <FormControlLabel
                    value="isbn"
                    control={<Radio />}
                    label="Por ISBN"
                    className="radio-label"
                  />
                  <FormControlLabel
                    value="nombre"
                    control={<Radio />}
                    label="Por Nombre"
                    className="radio-label"
                  />
                  <FormControlLabel
                    value="codigo"
                    control={<Radio />}
                    label="Por Código"
                    className="radio-label"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          ) : (
            <Box>
              <TextField
                label={`Buscar por ${tipoBusqueda}`}
                variant="outlined"
                fullWidth
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                className="text-field"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={manejarBusqueda}
                className="search-button"
              >
                Buscar
              </Button>
            </Box>
          )}

          {resultado && <Typography className="result">{resultado}</Typography>}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BusquedaLibro;
