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
import Loading from "../Loading/Loading";
import "./historial.css";

interface Prestamo {
  codigoEstudiante: string;
  codigoLibro: string;
  nombreEstudiante: string;
  nombreLibro: string;
  fechaPrestamo: string;
  fechaDevolucion: string;
}

const HistorialPrestamos = ({
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
    try {
      const response = await fetch(
        "https://bibliosoftloanback-ahecc7fydjdze0ar.canadacentral-01.azurewebsites.net/loans"
      );
      if (!response.ok) {
        throw new Error("No se pudieron cargar los préstamos del historial.");
      }
      const data = await response.json();
      setPrestamos(data);
    } catch (err) {
      setError(
        "Error al cargar los préstamos del historial. Intenta nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const obtenerEstadoPrestamo = (fechaDevolucion: string) => {
    const fechaActual = new Date();
    const fechaDevolucionDate = new Date(fechaDevolucion);

    return fechaDevolucionDate < fechaActual ? "Vencido" : "Activo";
  };

  useEffect(() => {
    if (open) {
      obtenerHistorialPrestamos();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="dialog-title">Historial de Préstamos</DialogTitle>{" "}
      s
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
                      Nombre
                    </TableCell>
                    <TableCell className="table-header-cell" align="center">
                      Estado
                    </TableCell>
                    <TableCell className="table-header-cell" align="center">
                      Fecha Préstamo
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prestamos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
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
                        <TableCell align="center">
                          {prestamo.fechaPrestamo}
                        </TableCell>
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

export default HistorialPrestamos;
