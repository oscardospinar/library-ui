import React, { useState } from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    Dialog,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import PrestamosActivos from './PrestamosActivos';
import BusquedaLibro from './BusquedaLibro';
import Loans from './Loans';

const pages = ['Prestamos', 'Libros', 'Estudiantes'];

export function NavBar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [openPrestamos, setOpenPrestamos] = useState(false);
    const [openLoans, setOpenLoans] = useState(false);
    const [openBusquedaLibro, setOpenBusquedaLibro] = useState(false);  

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (): void => {
        setAnchorElNav(null);
    };

    const handleSectionClick = (section: string): void => {
        setActiveSection(section === activeSection ? null : section);
    };

    const handleOpenPrestamosActivos = (): void => setOpenPrestamos(true);
    const handleClosePrestamosActivos = (): void => setOpenPrestamos(false);

    const handleOpenLoans = (): void => setOpenLoans(true);
    const handleCloseLoans = (): void => setOpenLoans(false);

    const handleLoansSuccess = (): void => {
        setActiveSection('Prestamos');
        setOpenLoans(false);
    };

    const handleOpenBusquedaLibro = (): void => {
        setOpenBusquedaLibro(true);  
        setActiveSection(null);  
    };

    const handleCloseBusquedaLibro = (): void => {
        setOpenBusquedaLibro(false);  
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#0271df' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => handleSectionClick(page)}>
                                        <Typography>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={() => handleSectionClick(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar alt="User" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {activeSection === 'Prestamos' && (
                <Box sx={{ p: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenLoans}
                        sx={{ mb: 2 }}
                    >
                        Registrar Préstamo
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenBusquedaLibro}  
                        sx={{ mb: 2, ml: 2 }}
                    >
                        Buscar Disponibilidad del Libro
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleOpenPrestamosActivos}
                        sx={{ mb: 2, ml: 2 }}
                    >
                        Mirar Préstamos Activos
                    </Button>
                </Box>
            )}

    
            <Dialog open={openBusquedaLibro} onClose={handleCloseBusquedaLibro}>
                <BusquedaLibro open={openBusquedaLibro} onClose={handleCloseBusquedaLibro} />
            </Dialog>

            {openLoans && (
                <Loans open={openLoans} onClose={handleCloseLoans} onSuccess={handleLoansSuccess} />
            )}
            <PrestamosActivos open={openPrestamos} onClose={handleClosePrestamosActivos} />
        </>
    );
}
