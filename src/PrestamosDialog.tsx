import React, { useState } from "react";
import { Dialog, Button, Box } from "@mui/material";
import Loans from "./components/NavBar/Loans";
import BusquedaLibro from "./components/NavBar/BusquedaLibro";
import PrestamosActivos from "./components/NavBar/PrestamosActivos";

type PrestamosDialogProps = {
  open: boolean;
  onClose: () => void;
};

const PrestamosDialog: React.FC<PrestamosDialogProps> = ({ open, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleLoanSuccess = () => {
    console.log("El préstamo fue exitoso");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOptionSelect("RegistrarPréstamo")}
          sx={{ mb: 2 }}
        >
          Registrar Préstamo
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOptionSelect("BuscarDisponibilidad")}
          sx={{ mb: 2, ml: 2 }}
        >
          Buscar Disponibilidad del Libro
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOptionSelect("MirarPrestamosActivos")}
          sx={{ mb: 2, ml: 2 }}
        >
          Mirar Préstamos Activos
        </Button>

        {selectedOption === "RegistrarPréstamo" && (
          <Loans open={true} onClose={onClose} onSuccess={handleLoanSuccess} />
        )}
        {selectedOption === "BuscarDisponibilidad" && (
          <BusquedaLibro open={true} onClose={onClose} />
        )}
        {selectedOption === "MirarPrestamosActivos" && (
          <PrestamosActivos open={true} onClose={onClose} />
        )}
      </Box>
    </Dialog>
  );
};

export default PrestamosDialog;
