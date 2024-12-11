import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './stylesLogin.css';
import Cookies from 'js-cookie'; // Importamos la librería js-cookie

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValido, setCaptchaValido] = useState(false);

    const navigate = useNavigate();

    const manejarCaptcha = (value: string | null) => {
        if (value) {
            setCaptchaValido(true);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (captchaValido) {
            try {
                const response = await fetch(
                    'https://cvds-project-cnb6c0cuddfyc9fe.mexicocentral-01.azurewebsites.net/usuario/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            nombreUsuario: username,
                            contrasena: password,
                        }),
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    // Guardamos el token en cookies
                    Cookies.set('token', data.token, { expires: 1 }); // Guardamos el token con una duración de 7 días
                    Cookies.set('user', JSON.stringify({
                        nombreUsuario: data.nombreUsuario,
                        rol: data.rol,
                    }), { expires: 7 });
                    console.log('Token:', data.token);
                    alert('Inicio de sesión exitoso');

                    // Redirigir según el rol
                    if (data.rol === 'Bibliotecario') {
                        navigate('/navar');
                    } else {
                        navigate('/navar2');
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
        <div className="container">
            <div className="info">
                <h1>BiblioSoft</h1>
            </div>
            <div className="form">
                <div className="thumbnail">
                    <img
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/hat.svg"
                        alt="Logo"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            width: '80%',
                            maxWidth: '100%',
                            padding: '10px',
                            margin: '10px',
                            display: 'block',
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '80%',
                            maxWidth: '100%',
                            padding: '10px',
                            margin: '10px',
                            display: 'block',
                        }}
                    />
                    <div id="captcha-container">
                        <ReCAPTCHA
                            sitekey="6LcD-YQqAAAAAKmisLvpnV7EHvNoN7w-ZDUYpJsA"
                            onChange={manejarCaptcha}
                        />
                    </div>
                    <button type="submit" disabled={!captchaValido}>
                        Ingresar
                    </button>
                </form>
            </div>
            <video id="video" autoPlay loop muted>
                <source
                    src="http://andytran.me/A%20peaceful%20nature%20timelapse%20video.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Login;
