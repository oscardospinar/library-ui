import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./Loans.css";

interface LoansProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const Loans = ({ open, onClose, onSuccess }: LoansProps) => {
  const [codigoEstudiante, setCodigoEstudiante] = useState("");
  const [codigoLibro, setCodigoLibro] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Registrar préstamo:", { codigoEstudiante, codigoLibro });
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Registrar Préstamo</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Gestión de Préstamos
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Código del Estudiante"
              variant="outlined"
              sx={{ mb: 2, width: "100%" }}
              value={codigoEstudiante}
              onChange={(e) => setCodigoEstudiante(e.target.value)}
            />
            <TextField
              label="Código del Libro"
              variant="outlined"
              sx={{ mb: 2, width: "100%" }}
              value={codigoLibro}
              onChange={(e) => setCodigoLibro(e.target.value)}
            />
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Registrar Préstamo
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Loans;