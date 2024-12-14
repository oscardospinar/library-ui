import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Responsable.css';


function EmailValidation() {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [responsableNoExiste, setResponsableNoExiste] = useState(false); // Controla la visibilidad de las casillas adicionales.
    const [nuevoResponsable, setNuevoResponsable] = useState({
        nombreCompleto: '',
        correoElectronico: '',
        telefono: '',
        direccion: '',
        documentoIdentificacion: '',
    });

    const navigate = useNavigate(); // Hook para la navegación.
    const token = Cookies.get('token'); // Obtén el token desde las cookies.

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
                            Authorization: `Bearer ${token}`, // Agrega el token al encabezado.
                        },
                        body: JSON.stringify({ correoElectronico: email }),
                    }
                );

                if (!response.ok) {
                    const errorData = await response.text();
                    throw new Error(errorData || 'Error desconocido.');
                }

                const responsableExiste = await response.json();

                if (!responsableExiste) {
                    setMensaje('El correo es válido y el responsable existe.');
                    navigate('/Registro', { state: { responsableId: email } });
                } else {
                    setMensaje('El responsable no existe. Por favor, ingresa los datos del nuevo responsable.');
                    setResponsableNoExiste(true);
                }
            } catch (error: any) {
                setMensaje('Error al enviar los datos al servidor.');
                console.error('Error:', error.message || error);
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
                        Authorization: `Bearer ${token}`, // Agrega el token al encabezado.
                    },
                    body: JSON.stringify(nuevoResponsable),
                }
            );

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Error desconocido.');
            }

            setMensaje('Responsable registrado con éxito.');
            navigate('/Registro', { state: { responsableId: nuevoResponsable.correoElectronico } }); // Enviar el correo al registrar al responsable.
        } catch (error: any) {
            setMensaje('Error al registrar el nuevo responsable.');
            console.error('Error:', error.message || error);
        }
    };

    return (
        <div className="container">
            <div className="info">
                <h1 style={{ color: 'black', fontSize: '2rem', textAlign: 'center' }}>Validador de Correo</h1>
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
                            placeholder="Nombre Completo"
                            name="nombreCompleto"
                            value={nuevoResponsable.nombreCompleto}
                            onChange={handleNuevoResponsableChange}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            name="correoElectronico"
                            value={nuevoResponsable.correoElectronico}
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
                        <input
                            type="text"
                            placeholder="Dirección"
                            name="direccion"
                            value={nuevoResponsable.direccion}
                            onChange={handleNuevoResponsableChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Documento de Identificación"
                            name="documentoIdentificacion"
                            value={nuevoResponsable.documentoIdentificacion}
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
