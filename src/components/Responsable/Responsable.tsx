import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmailValidation() {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [responsableNoExiste, setResponsableNoExiste] = useState(false); // Controla la visibilidad de las casillas adicionales.
    const [nuevoResponsable, setNuevoResponsable] = useState({
        nombre: '',
        documento: '',
        lugar: '',
        telefono: '',
    });

    const navigate = useNavigate(); // Hook para la navegación.

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (regexCorreo.test(email)) {
            try {
                const response = await fetch(
                    'https://cvds-project-cnb6c0cuddfyc9fe.mexicocentral-01.azurewebsites.net/usuario/validarResponsableEconomico',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email, // Envía el correo validado al backend.
                        }),
                    }
                );

                if (response.ok) {
                    setMensaje('El correo es válido y el responsable existe.');
                    navigate('/Registro'); // Navega al componente de registro.
                } else if (response.status === 404) {
                    setMensaje('El responsable no existe. Por favor, ingresa los datos del nuevo responsable.');
                    setResponsableNoExiste(true); // Muestra las casillas adicionales.
                } else {
                    const errorData = await response.json();
                    setMensaje(`Error en la solicitud: ${errorData.message || 'Desconocido'}`);
                }
            } catch (error) {
                setMensaje('Error al enviar los datos al servidor.');
                console.error('Error:', error);
            }
        } else {
            setMensaje('El correo no es válido.');
        }
    };

    const handleNuevoResponsableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNuevoResponsable({ ...nuevoResponsable, [name]: value });
    };

    const handleNuevoResponsableSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(
                'https://cvds-project-cnb6c0cuddfyc9fe.mexicocentral-01.azurewebsites.net/usuario/registrarResponsableEconomico',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoResponsable),
                }
            );

            if (response.ok) {
                setMensaje('Responsable registrado con éxito.');
                navigate('/Registro'); // Navega al componente de registro.
            } else {
                const errorData = await response.json();
                setMensaje(`Error al registrar: ${errorData.message || 'Desconocido'}`);
            }
        } catch (error) {
            setMensaje('Error al registrar el nuevo responsable.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <div className="info">
                <h1>Validador de Correo</h1>
            </div>
            <div className="form">
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
                    <button type="submit">Validar</button>
                </form>
                {responsableNoExiste && (
                    <form onSubmit={handleNuevoResponsableSubmit}>
                        <input
                            type="text"
                            placeholder="Nombre"
                            name="nombre"
                            value={nuevoResponsable.nombre}
                            onChange={handleNuevoResponsableChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Documento"
                            name="documento"
                            value={nuevoResponsable.documento}
                            onChange={handleNuevoResponsableChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Lugar"
                            name="lugar"
                            value={nuevoResponsable.lugar}
                            onChange={handleNuevoResponsableChange}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Teléfono"
                            name="telefono"
                            value={nuevoResponsable.telefono}
                            onChange={handleNuevoResponsableChange}
                            required
                        />
                        <button type="submit">Registrar Responsable</button>
                    </form>
                )}
                <p
                    style={{
                        color: mensaje.includes('éxito') || mensaje.includes('válido') ? 'green' : 'red',
                        marginTop: '10px',
                    }}
                >
                    {mensaje}
                </p>
            </div>
        </div>
    );
}

export default EmailValidation;
