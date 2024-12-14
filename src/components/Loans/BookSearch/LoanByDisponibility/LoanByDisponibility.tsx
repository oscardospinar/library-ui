import React, { useState } from "react";
import Prestamos from "../../Loan/Prestamos";
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
import "./Disponibility.css";

const LoanByDisponobility = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [openPrestamos, setOpenPrestamos] = useState(false);
  const [selectedCopia, setSelectedCopia] = useState<string | null>(null);

  const handleRegistrarCopia = (idCopia: string) => {
    setSelectedCopia(idCopia);
    setOpenPrestamos(true);
  };

  const handleClosePrestamos = () => {
    setOpenPrestamos(false);
    setSelectedCopia(null);
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
        <DialogTitle className="dialog-title">Copias Disponibles</DialogTitle>
        <DialogContent className="dialog-content">
          <Box>
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, textAlign: "center" }}
            >
              Lista de Copias Disponibles
            </Typography>
            <TableContainer component={Paper} className="table-wrapper">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="table-header-cell" align="center">
                      ID de Copia
                    </TableCell>
                    <TableCell className="table-header-cell" align="center">
                      Acción
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array(5)
                    .fill(null)
                    .map((_, index) => {
                      const idCopia = `C${index + 1}`;
                      return (
                        <TableRow key={idCopia} className="table-row">
                          <TableCell align="center">{idCopia}</TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleRegistrarCopia(idCopia)}
                            >
                              Registrar Copia
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
      {openPrestamos && (
        <Dialog
          open={openPrestamos}
          onClose={handleClosePrestamos}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Registrar Préstamo</DialogTitle>
          <DialogContent>
            <Prestamos
              onSuccess={() => {
                handleClosePrestamos();
                onClose();
              }}
              onClose={handleClosePrestamos}
              idCopia={selectedCopia}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default LoanByDisponobility;
