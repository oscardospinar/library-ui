import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BookIcon from "@mui/icons-material/Book";
import { useNavigate } from "react-router-dom";
import PrestamosDialog from "../../pages/Loans/PrestamosDialog";
import { motion } from "framer-motion";

const pages = [
  { name: "Prestamos", color: "#ff69b4" },
  { name: "Libros", color: "#ffd700" },
  { name: "Estudiantes", color: "#32cd32" },
];

export function NavBar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openPrestamosDialog, setOpenPrestamosDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleSectionClick = (section: string): void => {
    if (section === "Prestamos") {
      setOpenPrestamosDialog(true);
    } else if (section === "Libros") {
      navigate("/libros");
    }
    setActiveSection((prevSection) => (section === prevSection ? null : section));
  };

  const handleClosePrestamosDialog = (): void => {
    setOpenPrestamosDialog(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      
      <Box
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <img
          src="/colegioLogo.png"
          style={{
            height: "53px", 
            width: "auto",  
            
          }}
        />
        <Box sx={{ flex: 1, maxWidth: "400px", mx: 3 }}>
          <TextField
            type="search"
            placeholder="Buscar..."
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginRight: "2rem" }}>
          <Button
            id="user-menu-button"
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            startIcon={<AccountCircleIcon />}
          >
            user123
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "user-menu-button",
            }}
          >
            <MenuItem onClick={handleClose}>Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Configuración</MenuItem>
            <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Box>

      <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: "none" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
                      mx: 2,
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

      <PrestamosDialog open={openPrestamosDialog} onClose={handleClosePrestamosDialog} />
    </motion.nav>
  );
}
