import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';

interface RegisterProps {
  open: boolean;
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ open, onClose }) => {
  const [codigoEstudiante, setCodigoEstudiante] = useState('');
  const [codigoLibro, setCodigoLibro] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los datos, por ejemplo, enviarlos a una API.
    console.log('Código Estudiante:', codigoEstudiante);
    console.log('Código Libro:', codigoLibro);
    // Cerrar el diálogo al enviar el formulario
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="dialog-title">Registrar Préstamo</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Código del Estudiante"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={codigoEstudiante}
              onChange={(e) => setCodigoEstudiante(e.target.value)}
            />
            <TextField
              label="Código del Libro"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={codigoLibro}
              onChange={(e) => setCodigoLibro(e.target.value)}
            />
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Registrar Préstamo
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};


export default Register;

export default Register;

