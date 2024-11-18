import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Prestamo {
    codigoEstudiante: string;
    codigoLibro: string;
    nombreEstudiante: string;
    nombreLibro: string;
    fechaPrestamo: string;
    fechaDevolucion: string;
}

const PrestamosActivos = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [prestamos, setPrestamos] = useState<Prestamo[]>([]);

    useEffect(() => {
        const prestamosSimulados = [
            {
                codigoEstudiante: 'E123',
                codigoLibro: 'L001',
                nombreEstudiante: 'Juan Pérez',
                nombreLibro: 'React para Principiantes',
                fechaPrestamo: '2024-11-01',
                fechaDevolucion: '2024-11-15',
            },
            {
                codigoEstudiante: 'E124',
                codigoLibro: 'L002',
                nombreEstudiante: 'Ana López',
                nombreLibro: 'JavaScript Avanzado',
                fechaPrestamo: '2024-10-15',
                fechaDevolucion: '2024-11-15',
            },
            // Aquí puedes agregar más préstamos simulados
        ];
        setPrestamos(prestamosSimulados);
    }, []);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Préstamos Activos</DialogTitle>
            <DialogContent>
                <Box sx={{ minWidth: 600 }}>
                    <Typography variant="h6">Lista de Préstamos Activos</Typography>
                    {/* Tabla vacía con las columnas */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Código Estudiante</TableCell>
                                    <TableCell align="center">Código Libro</TableCell>
                                    <TableCell align="center">Fecha Préstamo</TableCell>
                                    <TableCell align="center">Fecha Devolución</TableCell>
                                    <TableCell align="center">Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Si hay datos en el estado "prestamos", se mostrarán las filas */}
                                {prestamos.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No hay préstamos activos.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    prestamos.map((prestamo, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{prestamo.codigoEstudiante}</TableCell>
                                            <TableCell align="center">{prestamo.codigoLibro}</TableCell>
                                            <TableCell align="center">{prestamo.fechaPrestamo}</TableCell>
                                            <TableCell align="center">{prestamo.fechaDevolucion}</TableCell>
                                            <TableCell align="center">Activo</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PrestamosActivos;
