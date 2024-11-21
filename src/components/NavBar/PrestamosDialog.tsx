import React, { useState } from 'react';
import { Dialog, Button, Box, Stack } from '@mui/material';
import Loans from './Loans';
import BusquedaLibro from './BusquedaLibro';
import PrestamosActivos from './PrestamosActivos';

type PrestamosDialogProps = {
    open: boolean;
    onClose: () => void;
};

const PrestamosDialog: React.FC<PrestamosDialogProps> = ({ open, onClose }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleLoanSuccess = () => {
        console.log("El préstamo fue exitoso");
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Box sx={{ p: 3 }}>
               
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOptionSelect('RegistrarPréstamo')}
                        sx={{ width: '200px' }}
                    >
                        Registrar Préstamo
                    </Button>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOptionSelect('BuscarDisponibilidad')}
                        sx={{ width: '200px' }}
                    >
                        Buscar Disponibilidad del Libro
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOptionSelect('MirarPrestamosActivos')}
                        sx={{ width: '200px' }}
                    >
                        Mirar Préstamos Activos
                    </Button>
                </Stack>
                {selectedOption === 'RegistrarPréstamo' && (
                    <Loans open={true} onClose={onClose} onSuccess={handleLoanSuccess} />
                )}
                {selectedOption === 'BuscarDisponibilidad' && (
                    <BusquedaLibro open={true} onClose={onClose} />
                )}
                {selectedOption === 'MirarPrestamosActivos' && (
                    <PrestamosActivos open={true} onClose={onClose} />
                )}
            </Box>
        </Dialog>
    );
};

export default PrestamosDialog;
