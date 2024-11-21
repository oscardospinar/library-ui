import React from "react";
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
} from "@mui/material";
import { AccessTime, Search, Assignment } from "@mui/icons-material";
import { motion } from "framer-motion"; // Importar framer-motion
import Loans from "./Loans";
import BusquedaLibro from "./BusquedaLibro";
import PrestamosActivos from "./PrestamosActivos";

// Enum para las opciones de préstamo
enum Option {
  RegistrarPréstamo = "RegistrarPréstamo",
  BuscarDisponibilidad = "BuscarDisponibilidad",
  MirarPrestamosActivos = "MirarPrestamosActivos",
}

type PrestamosPageProps = {
  onClose: () => void;
};

const PrestamosPage: React.FC<PrestamosPageProps> = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(
    null
  );

  // Maneja el éxito del préstamo
  const handleLoanSuccess = () => {
    console.log("El préstamo fue exitoso");
  };

  // Renderiza la opción seleccionada
  const renderSelectedOption = () => {
    switch (selectedOption) {
      case Option.RegistrarPréstamo:
        return (
          <Loans open={true} onClose={onClose} onSuccess={handleLoanSuccess} />
        );
      case Option.BuscarDisponibilidad:
        return <BusquedaLibro open={true} onClose={onClose} />;
      case Option.MirarPrestamosActivos:
        return <PrestamosActivos open={true} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
      <Paper sx={{ mb: 4, p: 3, backgroundColor: "#ffffff", boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Gestión de Préstamos de Libros
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary">
          Administra las operaciones de préstamo de libros de manera eficiente y
          rápida.
        </Typography>
      </Paper>

      {/* Cards con animaciones de hover */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <motion.div
            whileHover={{ scale: 1.05 }} // Animación en hover
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
                  Realiza nuevos registros de préstamos de libros para los
                  usuarios.
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
                  onClick={() => setSelectedOption(Option.RegistrarPréstamo)}
                >
                  Ir a Registrar
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={4}>
          <motion.div
            whileHover={{ scale: 1.05 }} // Animación en hover
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
                  onClick={() => setSelectedOption(Option.BuscarDisponibilidad)}
                >
                  Buscar Disponibilidad
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={4}>
          <motion.div
            whileHover={{ scale: 1.05 }} // Animación en hover
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

      {/* Renderiza la opción seleccionada */}
      {renderSelectedOption()}
    </Box>
  );
};

export default PrestamosPage;
