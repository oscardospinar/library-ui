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
  const [prestamos, setPrestamos] = useState<Prestamo[]>([
    {
      codigoEstudiante: "E001",
      codigoLibro: "L001",
      nombreEstudiante: "Juan Pérez",
      nombreLibro: "JavaScript Avanzado",
      fechaPrestamo: "2024-11-01",
      fechaDevolucion: "2024-12-01",
    },
    {
      codigoEstudiante: "E002",
      codigoLibro: "L002",
      nombreEstudiante: "Ana Gómez",
      nombreLibro: "React para Principiantes",
      fechaPrestamo: "2024-11-05",
      fechaDevolucion: "2024-12-05",
    },
    {
      codigoEstudiante: "E003",
      codigoLibro: "L003",
      nombreEstudiante: "Carlos Rodríguez",
      nombreLibro: "Node.js y Express",
      fechaPrestamo: "2024-11-10",
      fechaDevolucion: "2024-12-10",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false);
  const [selectedPrestamo, setSelectedPrestamo] = useState<Prestamo | null>(
    null
  );

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
                        estudiante
                      </TableCell>
                      <TableCell className="table-header-cell" align="center">
                        libro
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
          nombreEstudiante={selectedPrestamo.nombreEstudiante}
          nombreLibro={selectedPrestamo.nombreLibro}
        />
      )}
    </>
  );
};

export default PrestamosActivos;