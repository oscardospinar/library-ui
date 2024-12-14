import React, { useEffect, useState } from "react";
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
import Prestamos from "../../components/Loans/Loan/Prestamos";
import BusquedaLibro from "../../components/Loans/BookSearch/BusquedaLibro";
import PrestamosActivos from "../../components/Loans/ActiveLoan/PrestamosActivos";
import HistorialPrestamos from "../../components/Loans/History/historial";
import Register from "../../components/Loans/RegisterLoans/Register";
import ActiveLoansStudent from "../../components/Loans/StudientView/activeLoans/activeLoan";
import StudientHisto from "../../components/Loans/StudientView/history/StudientHistory";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

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
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Control de carga

  // useEffect para obtener el rol del usuario desde las cookies
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setRole(user.rol);
      setLoading(false);
    }
  }, []);

  const handleClose = () => {
    setSelectedOption(null);
  };

  const renderSelectedOption = () => {
    if (role === "Bibliotecario") {
      switch (selectedOption) {
        case Option.RegistrarPréstamo:
          return <Register open={true} onClose={handleClose} />;
        case Option.BuscarDisponibilidad:
          return <BusquedaLibro open={true} onClose={handleClose} />;
        case Option.MirarPrestamosActivos:
          return <PrestamosActivos open={true} onClose={handleClose} />;
        case Option.Historial:
          return <HistorialPrestamos open={true} onClose={handleClose} />;
        default:
          return null;
      }
    } else if (role === "Estudiante") {
      switch (selectedOption) {
        case Option.MirarPrestamosActivos:
          return <ActiveLoansStudent open={true} onClose={handleClose} />;
        case Option.Historial:
          return <StudientHisto open={true} onClose={handleClose} />;
        default:
          return null;
      }
    }
    return <Typography variant="h6">No autorizado.</Typography>; // Manejo de acceso no autorizado
  };

  if (loading) {
    return <Typography variant="h6">Cargando...</Typography>; // Mensaje de carga mientras se obtiene el rol
  }

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="lg" sx={{ minWidth: "80%" }}>
      <DialogTitle>Gestión de Préstamos de Libros</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
          <Paper sx={{ mb: 4, p: 3, backgroundColor: "#ffffff", boxShadow: 3 }}>
            <Typography variant="h4" gutterBottom align="center">
              Gestión de Préstamos de Libros
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary">
              Administración de las operaciones de préstamo de libros de manera eficiente y rápida.
            </Typography>
          </Paper>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Opciones para el bibliotecario */}
            {role === "Bibliotecario" && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Registrar Préstamo
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Realiza nuevos prestamos para Estudiantes
                        </Typography>
                        <IconButton color="primary" sx={{ fontSize: 50 }}>
                          <Assignment />
                        </IconButton>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={() => { setSelectedOption(Option.RegistrarPréstamo); }}>
                          Ir a Registrar
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Buscar Disponibilidad
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Consulta la disponibilidad de libros para préstamo.
                        </Typography>
                        <IconButton color="primary" sx={{ fontSize: 50 }}>
                          <Search />
                        </IconButton>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={() => setSelectedOption(Option.BuscarDisponibilidad)}>
                          Buscar
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Ver Préstamos Activos
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Consulta los préstamos activos de los estudiantes.
                        </Typography>
                        <IconButton color="primary" sx={{ fontSize: 50 }}>
                          <AccessTime />
                        </IconButton>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={() => setSelectedOption(Option.MirarPrestamosActivos)}>
                          Ver Préstamos Activos
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Historial de Préstamos
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Consulta el historial completo de préstamos de libros.
                        </Typography>
                        <IconButton color="primary" sx={{ fontSize: 50 }}>
                          <Assignment />
                        </IconButton>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={() => setSelectedOption(Option.Historial)}>
                          Ver Historial
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              </>
            )}

            {/* Opciones para el estudiante */}
            {role === "Estudiante" && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Ver Préstamos Activos
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Consulta tus préstamos activos.
                        </Typography>
                        <IconButton color="primary" sx={{ fontSize: 50 }}>
                          <AccessTime />
                        </IconButton>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={() => setSelectedOption(Option.MirarPrestamosActivos)}>
                          Ver Préstamos Activos
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Historial de Préstamos
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Consulta tu historial de préstamos.
                        </Typography>
                        <IconButton color="primary" sx={{ fontSize: 50 }}>
                          <Assignment />
                        </IconButton>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={() => setSelectedOption(Option.Historial)}>
                          Ver Historial
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              </>
            )}
          </Grid>

          {renderSelectedOption()}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PrestamosPage;
