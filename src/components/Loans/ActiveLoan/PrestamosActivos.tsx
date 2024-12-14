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
  studentId: string;
  copyId: string;
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

  // Llamada a la API
  useEffect(() => {
    const fetchPrestamos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://bibliosoftloanback-ahecc7fydjdze0ar.canadacentral-01.azurewebsites.net/loans/getLoans/state?state=Loaned"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos de préstamos");
        }
        const data = await response.json();

        // Mapeamos los datos para ajustarlos al formato esperado
        const prestamosFiltrados = data.map((item: any) => ({
          studentId: item.studentId,
          copyId: item.copyId,
          nombreEstudiante: item.studentName,
          nombreLibro: item.nameBook,
          fechaPrestamo: item.loanDate,
          fechaDevolucion: item.maxReturnDate,
        }));

        setPrestamos(prestamosFiltrados);
      } catch (error: any) {
        setError(error.message || "Ocurrió un error");
      } finally {
        setLoading(false);
      }
    };

    fetchPrestamos();
  }, []);

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
                        Estudiante
                      </TableCell>
                      <TableCell className="table-header-cell" align="center">
                        Libro
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
          studentId={selectedPrestamo.studentId}
          copyId={selectedPrestamo.copyId}
          nombreEstudiante={selectedPrestamo.nombreEstudiante}
          nombreLibro={selectedPrestamo.nombreLibro}
        />
      )}
    </>
  );
};

export default PrestamosActivos;
