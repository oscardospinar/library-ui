import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Loading from "../../Loading/Loading"; // Asegúrate de que la ruta sea correcta

import "./StudientHistory.css";

interface Prestamo {
  nombreEstudiante: string;
  nombreLibro: string;
  fecha: string;
  estado: string;
}

const StudientHistory = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Datos de ejemplo
  const prestamosEjemplo: Prestamo[] = [
    {
      nombreEstudiante: "Juan Pérez",
      nombreLibro: "Introducción a React",
      fecha: "2024-11-01",
      estado: "Activo",
    },
    {
      nombreEstudiante: "Ana Gómez",
      nombreLibro: "Aprendiendo TypeScript",
      fecha: "2024-11-05",
      estado: "Vencido",
    },
    {
      nombreEstudiante: "Carlos Martínez",
      nombreLibro: "Mastering JavaScript",
      fecha: "2024-11-10",
      estado: "Activo",
    },
  ];

  useEffect(() => {
    if (open) {
      // Usar los datos de ejemplo en lugar de hacer la llamada a la API
      setPrestamos(prestamosEjemplo);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      fullWidth
      maxWidth="md"
      disableEscapeKeyDown
      BackdropProps={{
        onClick: (e) => e.stopPropagation(), // Evita que el clic en el fondo cierre el diálogo
      }}
    >
      <DialogTitle className="dialog-title">Historial de Préstamos</DialogTitle>
      <DialogContent className="dialog-content">
        <Box>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            Historial Completo de Préstamos
          </Typography>
          {loading ? (
            <Box className="table-loading">
              <Loading />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ textAlign: "center" }}>
              {error}
            </Typography>
          ) : (
            <TableContainer component={Paper} className="table-wrapper">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="table-header-cell" align="center">
                      Estudiante
                    </TableCell>
                    <TableCell className="table-header-cell" align="center">
                      Libro
                    </TableCell>
                    <TableCell className="table-header-cell" align="center">
                      Fecha
                    </TableCell>
                    <TableCell className="table-header-cell" align="center">
                      Estado
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prestamos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No hay historial.
                      </TableCell>
                    </TableRow>
                  ) : (
                    prestamos.map((prestamo, index) => (
                      <TableRow key={index} className="table-row">
                        <TableCell align="center">
                          {prestamo.nombreEstudiante}
                        </TableCell>
                        <TableCell align="center">
                          {prestamo.nombreLibro}
                        </TableCell>
                        <TableCell align="center">{prestamo.fecha}</TableCell>
                        <TableCell align="center">{prestamo.estado}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} color="primary" className="close-button">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudientHistory;