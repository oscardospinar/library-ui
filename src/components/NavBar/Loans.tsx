import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export function Loans() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Gestión de Préstamos
            </Typography>
            <form>
                <TextField
                    label="Código del Estudiante"
                    variant="outlined"
                    sx={{ mb: 2, width: '100%' }}
                />
                <TextField
                    label="Código del Libro"
                    variant="outlined"
                    sx={{ mb: 2, width: '100%' }}
                />
                <Button variant="contained" color="primary">
                    Registrar Préstamo
                </Button>
            </form>
        </Box>
    );
}
