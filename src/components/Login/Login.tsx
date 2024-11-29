import React, { useState } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import Boton from '../Boton/Boton';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValido, setCaptchaValido] = useState(false);

  const navigate = useNavigate(); // Hook para redirigir

  const manejarCaptcha = (value: string | null) => {
    if (value) {
      setCaptchaValido(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (captchaValido) {
      try {
        const response = await fetch('https://cvds-project-cnb6c0cuddfyc9fe.mexicocentral-01.azurewebsites.net/usuario/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombreUsuario: username,
            contrasena: password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Guardar datos en localStorage
          localStorage.setItem(
            'user',
            JSON.stringify({
              nombreUsuario: data.nombreUsuario,
              rol: data.rol,
              token: data.token,
            })
          );
          alert('Inicio de sesión exitoso');

          // Redirigir según el rol
          if (data.rol === 'Bibliotecario') {
            navigate('/navar'); // Cambia '/navbar' a la ruta de tu página de Navbar
          } else {
            navigate('/navar2'); // Cambia '/hola-mundo' a la ruta de tu página de "Hola Mundo"
          }
        } else {
          alert('Error en el inicio de sesión. Código: ' + response.status);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error en el inicio de sesión: ' + error);
      }
    } else {
      alert('Por favor, complete el captcha');
    }
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Boton
            label="Ingresar"
            onClick={() => {}}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: captchaValido ? '#1976d2' : '#d3d3d3',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: captchaValido ? 'pointer' : 'not-allowed',
            }}
          />
        </form>
      </Box>
    </Container>
  );
}

export default Login;
