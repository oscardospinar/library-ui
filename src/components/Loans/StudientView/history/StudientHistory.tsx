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
import Loading from "../../Loading/Loading";

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

  const obtenerHistorialPrestamos = async () => {
    setLoading(true);
    setError(null);

    const studentId = "2024123456";

    try {
      const response = await fetch(
        `https://bibliosoftloanback-ahecc7fydjdze0ar.canadacentral-01.azurewebsites.net/loans/getHistoryByStudent/${studentId}`
      );

      if (!response.ok) {
        throw new Error("No se pudieron cargar los préstamos del historial.");
      }

      const data = await response.json();

      // Verificamos si la respuesta es un array
      const prestamosData = Array.isArray(data)
        ? data.map((item: any) => ({
            nombreEstudiante: item.studentName,
            nombreLibro: item.nameBook,
            fecha: item.loanDate,
            estado: item.loanState,
          }))
        : [
            {
              nombreEstudiante: data.studentName,
              nombreLibro: data.nameBook,
              fecha: data.loanDate,
              estado: data.loanState,
            },
          ]; 

      setPrestamos(prestamosData);
    } catch (err) {
      setError(
        "Error al cargar los préstamos del historial. Intenta nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      obtenerHistorialPrestamos();
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
        onClick: (e) => e.stopPropagation(),
      }}
    >
      <DialogTitle className="dialog-title">Historial de Préstamos</DialogTitle>
      <DialogContent className="dialog-content">
        <Box>
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