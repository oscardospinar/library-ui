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

const pages = [
  { name: "Prestamos", color: "#ff69b4" },
  { name: "Libros", color: "#ffd700" },
  { name: "Estudiantes", color: "#32cd32" },
  { name: "Registro", color: "#1976d2" }
];
const settings = ['Logout'];

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (setting: string) => {
    if (setting === 'Logout') {
      // Eliminar el token de las cookies
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      // Navegar a la página de inicio de sesión
      navigate('/');
    }
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

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => { 
                    handleLogout(setting); 
                    handleCloseUserMenu(); 
                  }}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <PrestamosDialog open={openPrestamosDialog} onClose={() => setOpenPrestamosDialog(false)} />
    </motion.nav>
  );
}