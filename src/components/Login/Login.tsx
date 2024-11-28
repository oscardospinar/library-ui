import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
  const [userAnswer, setUserAnswer] = useState('');
  const [captchaValido, setCaptchaValido] = useState(false);

  const manejarCaptcha = (value: string | null) => {
    if (value) {
      setCaptchaValido(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Inicio de sesión exitoso');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              my: 2,
            }}
          >
            <ReCAPTCHA
              sitekey="6LcD-YQqAAAAAKmisLvpnV7EHvNoN7w-ZDUYpJsA"
              onChange={manejarCaptcha}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!captchaValido}
            sx={{ mt: 2 }}
          >
            Ingresar
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
