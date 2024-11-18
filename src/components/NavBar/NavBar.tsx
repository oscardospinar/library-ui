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
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import PrestamosActivos from './PrestamosActivos'; 


// Definir los componentes de las secciones y configuraciones
const pages = ['Prestamos', 'Libros', 'Estudiantes'];
const settings = ['Perfil', 'Logout'];

export function NavBar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const [openBusqueda, setOpenBusqueda] = useState(false);
    const [codigoEstudiante, setCodigoEstudiante] = useState('');
    const [codigoLibro, setCodigoLibro] = useState('');
    const [openPrestamos, setOpenPrestamos] = useState(false);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [resultadoBusqueda, setResultadoBusqueda] = useState<string | null>(null);

    // Funciones de apertura y cierre de menús y formularios
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSectionClick = (section: string) => {
        setActiveSection(section === activeSection ? null : section); // Alterna entre activar/desactivar sección
    };

    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    const handleOpenBusqueda = () => setOpenBusqueda(true);
    const handleCloseBusqueda = () => setOpenBusqueda(false);

    const handleBusqueda = () => {
        if (terminoBusqueda === '123' || terminoBusqueda === '125') {
            setResultadoBusqueda('El libro está disponible.');
        } else {
            setResultadoBusqueda('El libro no está disponible o no existe.');
        }
    };

    const handleSubmit = () => {
        console.log("Código del estudiante:", codigoEstudiante);
        console.log("Código del libro:", codigoLibro);
        setOpenForm(false);
    };

    const handleOpenPrestamosActivos = () => setOpenPrestamos(true);
    const handleClosePrestamosActivos = () => setOpenPrestamos(false);

    return (
        <>
            <AppBar position="static">
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
                                    <MenuItem
                                        key={page}
                                        onClick={() => handleSectionClick(page)}
                                    >
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

            {/* Opciones de Préstamos */}
            {activeSection === 'Prestamos' && (
                <Box sx={{ p: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenForm}
                    >
                        Registrar Préstamo
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenBusqueda}
                        sx={{ ml: 2 }}
                    >
                        Buscar Disponibilidad del Libro
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleOpenPrestamosActivos}
                        sx={{ ml: 2 }}
                    >
                        Mirar Préstamos Activos
                    </Button>
                </Box>
            )}

            {/* Prestamos activos */}
            <PrestamosActivos
                open={openPrestamos}
                onClose={handleClosePrestamosActivos}
            />

            {/* Formulario de búsqueda */}
            <Dialog open={openBusqueda} onClose={handleCloseBusqueda}>
                <DialogTitle>Buscar Disponibilidad del Libro</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Código, ISBN o Nombre del Libro"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={terminoBusqueda}
                        onChange={(e) => setTerminoBusqueda(e.target.value)}
                    />
                    {resultadoBusqueda && (
                        <Box sx={{ mt: 2 }}>
                            <Typography>{resultadoBusqueda}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBusqueda}>Cancelar</Button>
                    <Button onClick={handleBusqueda}>Buscar</Button>
                </DialogActions>
            </Dialog>

            {/* Formulario de registro de préstamo */}
            <Dialog open={openForm} onClose={handleCloseForm}>
                <DialogTitle>Registrar Préstamo</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Código del Estudiante"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={codigoEstudiante}
                        onChange={(e) => setCodigoEstudiante(e.target.value)}
                    />
                    <TextField
                        label="Código del Libro"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={codigoLibro}
                        onChange={(e) => setCodigoLibro(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Registrar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
