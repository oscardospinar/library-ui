import React, { ReactElement, useState } from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
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
    { name: "Registro", color: "#f98404" }
];
const settings = ['Perfil', 'Configuración', 'Cerrar sesión'];

export function NavBar(): ReactElement {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [openPrestamosDialog, setOpenPrestamosDialog] = useState(false);

    const navigate = useNavigate();

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

    const handleSectionClick = (section: string): void => {
        if (section === "Prestamos") {
            setOpenPrestamosDialog(true);
        } else if (section === "Libros") {
            navigate("/libros");
        } else if (section === "Estudiantes") {
            navigate("/estudiantes");
        } else if (section === "Registro") {
            navigate("/responsable");
        }
        setActiveSection((prevSection) => (section === prevSection ? null : section));
        handleCloseNavMenu();
    };

    const handleClosePrestamosDialog = (): void => {
        setOpenPrestamosDialog(false);
    };

    const handleLogout = (): void => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        navigate("/");
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
            {/* Barra superior */}
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

                {/* Menú del usuario */}
                <Box sx={{ display: "flex", alignItems: "center", marginRight: "2rem" }}>
                    <Button
                        id="user-menu-button"
                        aria-controls={anchorElUser ? "user-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorElUser ? "true" : undefined}
                        onClick={handleOpenUserMenu}
                        endIcon={<KeyboardArrowDownIcon />}
                        startIcon={<AccountCircleIcon />}
                    >
                        user123
                    </Button>
                    <Menu
                        id="user-menu"
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{ "aria-labelledby": "user-menu-button" }}
                    >
                        {settings.map((setting) => (
                            <MenuItem
                                key={setting}
                                onClick={() => {
                                    if (setting === 'Cerrar sesión') handleLogout();
                                    handleCloseUserMenu();
                                }}
                            >
                                {setting}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>

            {/* Barra de navegación */}
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

                        {/* Links de navegación */}
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
