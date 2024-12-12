import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Avatar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";
import { useNavigate } from "react-router-dom";
import PrestamosDialog from "../../pages/Loans/PrestamosDialog";
import { motion } from "framer-motion";

const pages = [
  { name: "Prestamos", color: "#ff69b4" }, // Rosado
  { name: "Libros", color: "#ffd700" }, // Amarillo
  { name: "Estudiantes", color: "#32cd32" }, // Verde
];

export function NavBar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openPrestamosDialog, setOpenPrestamosDialog] = useState(false);
  const navigate = useNavigate();

  const handleSectionClick = (section: string): void => {
    if (section === "Prestamos") {
      setOpenPrestamosDialog(true);
    } else if (section === "Libros") {
      navigate("/libros");
    }
    setActiveSection((prevSection) =>
      section === prevSection ? null : section
    );
  };

  const handleClosePrestamosDialog = (): void => {
    setOpenPrestamosDialog(false);
  };

  const linkVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: "none" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo Animado */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <BookIcon sx={{ fontSize: 40, color: "white" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "white",
                    marginLeft: "0.5rem",
                  }}
                >
                  Bienvenido!
                </Typography>
              </motion.div>
            </Box>

            {/* Enlaces de navegación */}
            <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
              {pages.map((page, index) => (
                <motion.div
                  key={page.name}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => handleSectionClick(page.name)}
                    sx={{
                      color: page.color,
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: activeSection === page.name ? 700 : 400,
                      marginX: "1rem",
                    }}
                  >
                    {page.name}
                  </Button>
                </motion.div>
              ))}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      <PrestamosDialog
        open={openPrestamosDialog}
        onClose={handleClosePrestamosDialog}
      />
    </motion.nav>
  );
}
