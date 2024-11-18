import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const BusquedaLibro = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [resultado, setResultado] = useState<string | null>(null);
    
    const libros = [
        { isbn: '978-3-16-148410-0', nombre: 'Libro A', codigo: '123', disponible: true },
        { isbn: '978-1-234-56789-0', nombre: 'Libro B', codigo: '124', disponible: false },
        { isbn: '978-0-123-45678-9', nombre: 'Libro C', codigo: '125', disponible: true },
    ];

    const manejarBusqueda = () => {
        try {
            const libroEncontrado = libros.find(
                (libro) =>
                    libro.isbn.includes(terminoBusqueda) ||
                    libro.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                    libro.codigo.includes(terminoBusqueda)
            );

            if (libroEncontrado) {
                setResultado(
                    `Libro encontrado: ${libroEncontrado.nombre} (${libroEncontrado.isbn}) - ${libroEncontrado.disponible ? 'Disponible' : 'No disponible'}`
                );
            } else {
                setResultado('No se encontró ningún libro con ese término de búsqueda.');
            }
        } catch (error) {
            setResultado('Error al realizar la búsqueda. Intenta nuevamente más tarde.');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <TextField
                label="Buscar por ISBN, nombre o código"
                variant="outlined"
                fullWidth
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={manejarBusqueda}
                sx={{ mt: 2 }}
            >
                Buscar
            </Button>

            {resultado && (
                <Typography sx={{ mt: 2 }}>
                    {resultado}
                </Typography>
            )}
        </Box>
    );
};

export default BusquedaLibro;

export {}
