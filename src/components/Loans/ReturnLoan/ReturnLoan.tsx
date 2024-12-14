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
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "../Loan/Loans.css";

interface ReturnLoanProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  nombreEstudiante: string;
  nombreLibro: string;
}

const ReturnLoan = ({
  open,
  onClose,
  onSuccess,
  nombreEstudiante,
  nombreLibro,
}: ReturnLoanProps) => {
  const [estadoLibro, setEstadoLibro] = useState<string>("buenEstado");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Registrar devolución:", {
      nombreEstudiante,
      nombreLibro,
      estadoLibro,
    });
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Registrar Devolución de Préstamo</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Gestión de Devoluciones
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Estudiante: {nombreEstudiante}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Libro: {nombreLibro}
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Estado del Libro</Typography>
              <RadioGroup
                value={estadoLibro}
                onChange={(e) => setEstadoLibro(e.target.value)}
                row
              >
                <FormControlLabel
                  value="buenEstado"
                  control={<Radio />}
                  label="Buen Estado"
                />
                <FormControlLabel
                  value="deteriorado"
                  control={<Radio />}
                  label="Deteriorado"
                />
                <FormControlLabel
                  value="regular"
                  control={<Radio />}
                  label="Regular"
                />
              </RadioGroup>
            </FormControl>

            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Registrar Devolución
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnLoan;
