import React, { useState, useEffect } from 'react';
import CampoTexto from '../../components/CampoTexto/CampoTexto';
import ListaDesplegable from '../../components/ListaDesplegable/ListaDesplegable';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';
import Cookies from 'js-cookie';

interface Formulario {
  nombreUsuario: string;
  contrasena: string;
  nombreEstudiante: string;
  codigoEstudiante: string;
  curso: string;  
  anoAcademico: string;
  responsableId: string;
}


const token = Cookies.get('token'); // Obtén el token desde las cookies.
const FormularioRegistro: React.FC = () => {

  
  const navigate = useNavigate();
  const location = useLocation();
  const responsableIdFromState = location.state?.responsableId || '';

  const [formulario, setFormulario] = useState<Formulario>({
    codigoEstudiante: '',
    curso: '',
    responsableId: responsableIdFromState,
    nombreUsuario: '',
    contrasena: '',
    nombreEstudiante: '',
    anoAcademico: ''
  });

  const [opcionesCurso, setOpcionesCurso] = useState<string[]>([
    'Pre-Jardín','Jardín', 'Transición', '101', '201', '202', '301', '401', '402', '501', '502', '601', '701', '702','801', '802', '901', '902', '903', '1001','1002', '1003','1101', '1102', '1103'
  ]);

  const [captchaValido, setCaptchaValido] = useState<boolean>(false);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (['numeroDocumentoEstudiante'].includes(name) && !/^\d*$/.test(value)) {
      return;
    }

    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaValido) {
      alert('Por favor, completa el CAPTCHA');
      return;
    }

    try {
      const response = await fetch(
        'https://cvds-project-cnb6c0cuddfyc9fe.mexicocentral-01.azurewebsites.net/usuario/registrarEstudiante',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Agrega el token al encabezado.
          },
          body: JSON.stringify({
            nombreUsuario: formulario.nombreUsuario,
            contrasena: formulario.contrasena,
            nombreEstudiante:formulario.nombreEstudiante,            
            codigoEstudiante: formulario.codigoEstudiante,
            curso: formulario.curso,
            responsableId: formulario.responsableId,
            anoAcademico: formulario.anoAcademico
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Error desconocido');
      }

      alert('Estudiante registrado correctamente');
      navigate('/navar');
    } catch (error: any) {
      console.error('Error al registrar estudiante:', error.message || error);
      alert('Hubo un error al registrar al estudiante');
    }
  };

  const manejarCaptcha = (value: string | null) => {
    if (value) {
      setCaptchaValido(true);
    }
  };
  useEffect(() => {
    
    const fetchCursos = async () => {
      try {
        const response = await fetch('URL_DE_TU_API');
        const data = await response.json();
        setOpcionesCurso(data.cursos);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
      }
    };
  
    fetchCursos();
  }, []); 

  

  return (
    <form className="form-container" onSubmit={manejarEnvio}>
      <div className="titulo-contenedor">
        <img
          src="logoColegio.png"
          alt="Imagen izquierda"
          className="titulo-imagen"
        />
        <h2 style={{ color: 'white', fontSize: '1.8rem', textAlign: 'center' }} className="titulo-texto">Registro de Estudiante</h2>
        <img
          src="logoColegio.png"
          alt="Imagen derecha"
          className="titulo-imagen"
        />
      </div>
      <CampoTexto
        label="Código del Estudiante"
        name="codigoEstudiante"
        value={formulario.codigoEstudiante}
        onChange={manejarCambio}
        required
      />
      <ListaDesplegable
        label="Curso"
        name="curso"
        opciones={opcionesCurso}
        value={formulario.curso}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Correo responsable"
        name="responsableId"
        value={formulario.responsableId}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Nombre de usuario"
        name="nombreUsuario"
        value={formulario.nombreUsuario}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Contraseña"
        name="contrasena"
        type="password"
        value={formulario.contrasena}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Nombre del Estudiante"
        name="nombreEstudiante"
        value={formulario.nombreEstudiante}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Año académico"
        name="anoAcademico"
        value={formulario.anoAcademico}
        onChange={manejarCambio}
        required
      />
      <div className="captcha-container">
        <ReCAPTCHA
          sitekey="6LcD-YQqAAAAAKmisLvpnV7EHvNoN7w-ZDUYpJsA"
          onChange={manejarCaptcha}
        />
      </div>
      <div className="form-buttons">
        <button type="submit">Registrar</button>
      </div>
    </form>
  );
};

export default FormularioRegistro;
