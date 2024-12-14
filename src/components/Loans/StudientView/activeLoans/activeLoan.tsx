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
import "./active.css";

interface Prestamo {
  studentName: string;
  nameBook: string;
  loanDate: string;
  maxReturnDate: string;
  loanState: string;
}

const ActiveLoan = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      // Cargar préstamos activos solo cuando se abre el diálogo
      const fetchPrestamos = async () => {
        setLoading(true);
        setError(null);
        try {
          // ID del estudiante estático
          const studentId = "2024123456"; // ID de estudiante estático
          const url = `https://bibliosoftloanback-ahecc7fydjdze0ar.canadacentral-01.azurewebsites.net/loans/getLoans/state/${studentId}?state=Loaned`;

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();

          // Mapeamos la respuesta a los datos de la tabla
          const prestamosMapped = data.map((item: any) => ({
            studentName: item.studentName, // Usamos el nombre del estudiante
            nameBook: item.nameBook,
            loanDate: item.loanDate,
            maxReturnDate: item.maxReturnDate,
            loanState: item.loanState,
          }));
          setPrestamos(prestamosMapped);
        } catch (err: any) {
          setError(err.message || "Error al cargar los datos");
        } finally {
          setLoading(false);
        }
      };

      fetchPrestamos();
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
      <DialogTitle className="dialog-title">Préstamos Activos</DialogTitle>
      <DialogContent className="dialog-content">
        <Box>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            Lista de Préstamos Activos Del estudiante
          </Typography>
          {loading ? (
            <Typography align="center">Cargando préstamos...</Typography>
          ) : error ? (
            <Typography align="center" color="error">
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
                      Fecha de Prestamo
                    </TableCell>
                    <TableCell className="table-header-cell" align="center">
                      Fecha de Devolucion
                    </TableCell>
                    <TableCell className="table-header-cell" align="center">
                      Estado del Préstamo
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
                          {prestamo.studentName}{" "}
                          {/* Mostramos el nombre del estudiante */}
                        </TableCell>
                        <TableCell align="center">
                          {prestamo.nameBook}
                        </TableCell>
                        <TableCell align="center">
                          {prestamo.loanDate}
                        </TableCell>
                        <TableCell align="center">
                          {prestamo.maxReturnDate}
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

export default ActiveLoan;