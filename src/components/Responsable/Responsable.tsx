import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmailValidation() {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate(); // Hook para la navegación.

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (regexCorreo.test(email)) {
            setMensaje('El correo es válido.');
            navigate('/Registro'); // Navega al componente de registro.
        } else {
            setMensaje('El correo no es válido.');
        }
    };

    return (
        <div className="container">
            <div className="info">
                <h1>Validador de Correo</h1>
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
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '80%',
                            maxWidth: '100%',
                            padding: '10px',
                            margin: '10px',
                            display: 'block',
                        }}
                    />
                    <button type="submit">
                        Validar
                    </button>
                </form>
                <p
                    style={{
                        color: mensaje.includes('válido') ? 'green' : 'red',
                        marginTop: '10px',
                    }}
                >
                    {mensaje}
                </p>
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

export default EmailValidation;
