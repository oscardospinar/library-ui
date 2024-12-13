import React, { ReactElement, useState } from 'react';
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
  IconButton,
  Tooltip,
  Avatar
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BookIcon from "@mui/icons-material/Book";
import { useNavigate } from "react-router-dom";
import PrestamosDialog from "../../pages/Loans/PrestamosDialog";
import { motion } from "framer-motion";
import Cookies from 'js-cookie';

const pages = [
  { name: "Prestamos", color: "#ff69b4" },
  { name: "Libros", color: "#ffd700" },
  { name: "Estudiantes", color: "#32cd32" },
  { name: "Registro", color: "#1976d2" }
];

export function NavBar(): ReactElement {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openPrestamosDialog, setOpenPrestamosDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleSectionClick = (section: string): void => {
    if (section === "Prestamos") {
      setOpenPrestamosDialog(true);
    } else if (section === "Libros") {
      navigate("/libros");
    } else if (section === "Registro") {
      navigate("/Responsable");
    }
    setActiveSection((prevSection) => (section === prevSection ? null : section));
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    navigate('/');
  };

  const linkVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { scale: 1.1 },
  };

  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  const nombreUsuario = user ? user.nombreUsuario : 'Invitado';

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
            onClick={handleOpenUserMenu}
            endIcon={<KeyboardArrowDownIcon />}
            startIcon={<AccountCircleIcon />}
          >
            {nombreUsuario}
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            MenuListProps={{
              "aria-labelledby": "user-menu-button",
            }}
          >
            <MenuItem onClick={handleCloseUserMenu}>Perfil</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Configuración</MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleCloseUserMenu();
              }}
            >
              Cerrar sesión
            </MenuItem>
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

      <PrestamosDialog open={openPrestamosDialog} onClose={() => setOpenPrestamosDialog(false)} />
    </motion.nav>
  );
}
