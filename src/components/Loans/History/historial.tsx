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

interface HistorialPrestamo {
  nameBook: string;
  studentName: string;
  loanDate: string;
  loanState: string;
}

const HistorialPrestamos = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [prestamos, setPrestamos] = useState<HistorialPrestamo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  
  const obtenerHistorialPrestamos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://bibliosoftloanback-ahecc7fydjdze0ar.canadacentral-01.azurewebsites.net/loans/getHistory"
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
                      Nombre Estudiante
                    </TableCell>
                    <TableCell className="table-header-cell" align="center">
                      Libro
                    </TableCell>
                    <TableCell className="table-header-cell" align="center">
                      Fecha Préstamo
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
                          {prestamo.studentName}
                        </TableCell>
                        <TableCell align="center">
                          {prestamo.nameBook}
                        </TableCell>
                        <TableCell align="center">
                          {prestamo.loanDate}
                        </TableCell>
                        <TableCell align="center">
                          {prestamo.loanState}
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