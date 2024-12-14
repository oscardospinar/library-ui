import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
  studentId: string;
  copyId: string;
  nombreEstudiante: string;
  nombreLibro: string;
}

const ReturnLoan = ({
  open,
  onClose,
  onSuccess,
  studentId,
  copyId,
  nombreEstudiante,
  nombreLibro,
}: ReturnLoanProps) => {
  const [estadoLibro, setEstadoLibro] = useState<string>("buenEstado");

  // useEffect para imprimir studentId y copyId cuando el componente se abre
  useEffect(() => {
    if (open) {
      console.log("Componente abierto con los datos:", { studentId, copyId });
    }
  }, [open, studentId, copyId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      studentId,
      copyId,
      state: estadoLibro,
    };

    console.log("Enviando datos a la API:", payload);

    try {
      const response = await fetch(
        "https://bibliosoftloanback-ahecc7fydjdze0ar.canadacentral-01.azurewebsites.net/loans/returnLoan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Devolución registrada con éxito");
        onSuccess();
      } else {
        console.error("Error al registrar la devolución:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

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
