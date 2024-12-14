import React, { useState } from "react";
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
import "./active.css";

interface Prestamo {
  codigoEstudiante: string;
  codigoLibro: string;
  nombreEstudiante: string;
  nombreLibro: string;
  fechaPrestamo: string;
  fechaDevolucion: string;
}

const prestamosData: Prestamo[] = [
  {
    codigoEstudiante: "E001",
    codigoLibro: "L001",
    nombreEstudiante: "Juan Pérez",
    nombreLibro: "Introducción a React",
    fechaPrestamo: "2024-11-01",
    fechaDevolucion: "2024-12-01",
  },
  {
    codigoEstudiante: "E002",
    codigoLibro: "L002",
    nombreEstudiante: "María Gómez",
    nombreLibro: "JavaScript Avanzado",
    fechaPrestamo: "2024-11-10",
    fechaDevolucion: "2024-12-10",
  },
  {
    codigoEstudiante: "E003",
    codigoLibro: "L003",
    nombreEstudiante: "Carlos Ruiz",
    nombreLibro: "Fundamentos de CSS",
    fechaPrestamo: "2024-11-15",
    fechaDevolucion: "2024-12-15",
  },
];

const ActiveLoan = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>(prestamosData);

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
        onClick: (e) => e.stopPropagation(),
      }}
    >
      <DialogTitle className="dialog-title">Préstamos Activos</DialogTitle>
      <DialogContent className="dialog-content">
        <Box>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            Lista de Préstamos Activos Del estudiante
          </Typography>
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
                    Fecha de Prestamo
                  </TableCell>
                  <TableCell className="table-header-cell" align="center">
                    Fecha de Devolucion
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prestamos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No hay préstamos activos.
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
                      <TableCell align="center">
                        {prestamo.fechaPrestamo}
                      </TableCell>
                      <TableCell align="center">
                        {prestamo.fechaDevolucion}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
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

export default ActiveLoan;
