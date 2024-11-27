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
  CircularProgress,
} from "@mui/material";
import "./PrestamosActivos.css";
import ReturnLoan from "../ReturnLoan/ReturnLoan";
import Loading from "../Loading/Loading";

interface Prestamo {
  codigoEstudiante: string;
  codigoLibro: string;
  nombreEstudiante: string;
  nombreLibro: string;
  fechaPrestamo: string;
  fechaDevolucion: string;
}

const PrestamosActivos = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false);
  const [selectedPrestamo, setSelectedPrestamo] = useState<Prestamo | null>(
    null
  );

  const obtenerPrestamosActivos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://bibliosoftloanback-ahecc7fydjdze0ar.canadacentral-01.azurewebsites.net/loans"
      );
      if (!response.ok) {
        throw new Error("No se pudieron cargar los préstamos activos.");
      }
      const data = await response.json();
      setPrestamos(data);
    } catch (err) {
      setError(
        "Error al cargar los préstamos activos. Intenta nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      obtenerPrestamosActivos();
    }
  }, [open]);

  const handleOpenReturnDialog = (prestamo: Prestamo) => {
    setSelectedPrestamo(prestamo);
    setOpenReturnDialog(true);
  };

  const handleCloseReturnDialog = () => {
    setOpenReturnDialog(false);
    setSelectedPrestamo(null);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle className="dialog-title">Préstamos Activos</DialogTitle>
        <DialogContent className="dialog-content">
          <Box>
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, textAlign: "center" }}
            >
              Lista de Préstamos Activos
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
                        Código Estudiante
                      </TableCell>
                      <TableCell className="table-header-cell" align="center">
                        Código Libro
                      </TableCell>
                      <TableCell className="table-header-cell" align="center">
                        Fecha Préstamo
                      </TableCell>
                      <TableCell className="table-header-cell" align="center">
                        Fecha Devolución
                      </TableCell>
                      <TableCell className="table-header-cell" align="center">
                        Devolución
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
                            {prestamo.codigoEstudiante}
                          </TableCell>
                          <TableCell align="center">
                            {prestamo.codigoLibro}
                          </TableCell>
                          <TableCell align="center">
                            {prestamo.fechaPrestamo}
                          </TableCell>
                          <TableCell align="center">
                            {prestamo.fechaDevolucion}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleOpenReturnDialog(prestamo)}
                            >
                              Devolver
                            </Button>
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

      {selectedPrestamo && (
        <ReturnLoan
          open={openReturnDialog}
          onClose={handleCloseReturnDialog}
          onSuccess={handleCloseReturnDialog}
        />
      )}
    </>
  );
};

export default PrestamosActivos;
