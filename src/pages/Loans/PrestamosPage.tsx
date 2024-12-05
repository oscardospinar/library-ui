import React, { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { AccessTime, Search, Assignment } from "@mui/icons-material";
import { motion } from "framer-motion";
import Prestamos from "../../components/Loans/Loan/Prestamos";  // Importación del componente Prestamos
import BusquedaLibro from "../../components/Loans/BookSearch/BusquedaLibro";
import PrestamosActivos from "../../components/Loans/ActiveLoan/PrestamosActivos";
import HistorialPrestamos from "../../components/Loans/History/historial";

enum Option {
  RegistrarPréstamo = "RegistrarPréstamo",
  BuscarDisponibilidad = "BuscarDisponibilidad",
  MirarPrestamosActivos = "MirarPrestamosActivos",
  Historial = "Historial",
}

type PrestamosPageProps = {
  onClose: () => void;
};

const PrestamosPage: React.FC<PrestamosPageProps> = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [openPrestamoDialog, setOpenPrestamoDialog] = useState(false);

  const handleLoanSuccess = () => {
    console.log("El préstamo fue exitoso");
    setOpenPrestamoDialog(false);
  };

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case Option.RegistrarPréstamo:
        return (
          <Dialog
            open={openPrestamoDialog}
            onClose={() => setOpenPrestamoDialog(false)}
            fullWidth
            maxWidth="sm"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DialogContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: 600 }}>
                {/* Pasa tanto onSuccess como onClose a Prestamos */}
                <Prestamos onSuccess={handleLoanSuccess} onClose={onClose} />
              </Box>
            </DialogContent>
          </Dialog>
        );
      case Option.BuscarDisponibilidad:
        return <BusquedaLibro open={true} onClose={onClose} />;
      case Option.MirarPrestamosActivos:
        return <PrestamosActivos open={true} onClose={onClose} />;
      case Option.Historial:
        return <HistorialPrestamos open={true} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      sx={{ minWidth: "80%" }}
    >
      <DialogTitle>Gestión de Préstamos de Libros</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
          <Paper sx={{ mb: 4, p: 3, backgroundColor: "#ffffff", boxShadow: 3 }}>
            <Typography variant="h4" gutterBottom align="center">
              Gestión de Préstamos de Libros
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary">
              Administración de las operaciones de préstamo de libros de manera
              eficiente y rápida.
            </Typography>
          </Paper>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Cards for different options */}
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Registrar Préstamo
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Realiza nuevos prestamos para Estudiantes
                    </Typography>
                    <IconButton color="primary" sx={{ fontSize: 50 }}>
                      <Assignment />
                    </IconButton>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        setSelectedOption(Option.RegistrarPréstamo);
                        setOpenPrestamoDialog(true);
                      }}
                    >
                      Ir a Registrar
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>

            {/* Other grid items for different actions */}
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Historial de Préstamos
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Consulta el historial completo de préstamos de libros.
                    </Typography>
                    <IconButton color="primary" sx={{ fontSize: 50 }}>
                      <Assignment />
                    </IconButton>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => setSelectedOption(Option.Historial)}
                    >
                      Ver Historial
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>

            {/* Additional cards for other options */}
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Buscar Disponibilidad
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Consulta la disponibilidad de libros para préstamo.
                    </Typography>
                    <IconButton color="primary" sx={{ fontSize: 50 }}>
                      <Search />
                    </IconButton>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() =>
                        setSelectedOption(Option.BuscarDisponibilidad)
                      }
                    >
                      Buscar Disponibilidad
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Ver Préstamos Activos
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Consulta los préstamos activos y su estado actual.
                    </Typography>
                    <IconButton color="primary" sx={{ fontSize: 50 }}>
                      <AccessTime />
                    </IconButton>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() =>
                        setSelectedOption(Option.MirarPrestamosActivos)
                      }
                    >
                      Ver Activos
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {renderSelectedOption()}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PrestamosPage;
