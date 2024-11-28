import React, { useState, useEffect } from 'react';
import CampoTexto from '../../components/CampoTexto/CampoTexto';
import ListaDesplegable from '../../components/ListaDesplegable/ListaDesplegable';
import ReCAPTCHA from 'react-google-recaptcha';
import Boton from '../../components/Boton/Boton';
import { useNavigate } from 'react-router-dom';
import './style.css';


interface Formulario {
  codigoEstudiante: string;
  nombreEstudiante: string;
  numeroDocumentoEstudiante: string;
  tipoDocumentoEstudiante: string;
  nombreResponsable: string;
  documentoResponsable: string;
  lugarExpedicionResponsable: string;
  telefonoResponsable: string;
  correoResponsable: string;
  curso: string;
  grado: string;
  contrasena: string;
  confirmacionContrasena: string;
  otraCiudad?: string;
}

interface Errores {
  correoResponsable: string;
}

const FormularioRegistro: React.FC = () => {
  const navigate = useNavigate();

  const handlePrincipal = () => {

  };

  const [formulario, setFormulario] = useState<Formulario>({
    codigoEstudiante: '',
    nombreEstudiante: '',
    numeroDocumentoEstudiante: '',
    tipoDocumentoEstudiante: '',
    nombreResponsable: '',
    documentoResponsable: '',
    lugarExpedicionResponsable: '',
    telefonoResponsable: '',
    correoResponsable: '',
    curso: '',
    grado: '',
    contrasena: '',
    confirmacionContrasena: '',
  });

  const [opcionesCurso, setOpcionesCurso] = useState<string[]>([]);
  const [errores, setErrores] = useState<Errores>({
    correoResponsable: '',
  });
  const [captchaValido, setCaptchaValido] = useState<boolean>(false);

  const cursosPorPrefijo: Record<string, string[]> = {
    Prejardín: ['Pre-jardín'],
    Jardín: ['Jardín'],
    Transición: ['Transición'],
    Primero: ['101'],
    Segundo: ['201', '202'],
    Tercero: ['301'],
    Cuarto: ['401', '402'],
    Quinto: ['501', '502'],
    Sexto: ['601'],
    Séptimo: ['701', '702'],
    Octavo: ['801', '802'],
    Noveno: ['901', '902', '903'],
    Décimo: ['1001', '1002', '1003'],
    Once: ['1101', '1102', '1103'],
  };

  const ciudadesColombia: string[] = [
    'Arauca', 'Armenia', 'Barranquilla', 'Bogotá D.C', 'Bucaramanga', 'Cali',
    'Cartagena', 'Cúcuta', 'Florencia', 'Inírida', 'Ibagué', 'Leticia',
    'Manizales', 'Medellín', 'Mitú', 'Mocoa', 'Montería', 'Neiva',
    'Pasto', 'Pereira', 'Popayán', 'Puerto Carreño', 'Quibdó',
    'Riohacha', 'San Andrés', 'Santa Marta', 'Sincelejo', 'Tunja', 'Valledupar',
    'Villavicencio', 'Yopal', 'Otro',
  ];

  useEffect(() => {
    const gradoSeleccionado = formulario.grado;
    setOpcionesCurso(cursosPorPrefijo[gradoSeleccionado] || []);
  }, [formulario.grado]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (
      ['numeroDocumentoEstudiante', 'documentoResponsable', 'telefonoResponsable'].includes(name) &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    if (name === 'lugarExpedicionResponsable' && value !== 'Otro') {
      setFormulario({ ...formulario, otraCiudad: '', [name]: value });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }

    if (name === 'correoResponsable') {
      validarCorreo(value);
    }
  };

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaValido) {
      alert('Por favor, completa el CAPTCHA');
      return;
    }

    if (formulario.contrasena !== formulario.confirmacionContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!validarCorreo(formulario.correoResponsable)) {
      alert('El correo electrónico no es válido. Por favor, ingresa un correo válido.');
      return;
    }

    alert('Formulario enviado correctamente');
    console.log(formulario);
    
    navigate('/navar')
  };

  const todosCamposLlenos = (): boolean => {
    return Object.values(formulario).every((campo) => campo !== '');
  };

  const validarCorreo = (correo: string): boolean => {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexCorreo.test(correo)) {
      setErrores((prevErrores) => ({
        ...prevErrores,
        correoResponsable: 'El correo electrónico no es válido',
      }));
      return false;
    } else {
      setErrores((prevErrores) => ({
        ...prevErrores,
        correoResponsable: '',
      }));
      return true;
    }
  };

  const manejarCaptcha = (value: string | null) => {
    if (value) {
      setCaptchaValido(true);
    }
  };

  return (
    <form className="form-container" onSubmit={manejarEnvio}>
      <div className="titulo-contenedor">
        <img
          src="logoColegio.png"
          alt="Imagen izquierda"
          className="titulo-imagen"
        />
        <h2 className="titulo-texto">Registro de Estudiante</h2>
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
      <CampoTexto
        label="Nombre del Estudiante"
        name="nombreEstudiante"
        value={formulario.nombreEstudiante}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Número de Documento del Estudiante"
        name="numeroDocumentoEstudiante"
        value={formulario.numeroDocumentoEstudiante}
        onChange={manejarCambio}
        required
      />
      <ListaDesplegable
        label="Tipo de Documento"
        name="tipoDocumentoEstudiante"
        opciones={[ 'REGISTRO CIVIL', 'TI', 'CÉDULA'
        ]}
        value={formulario.tipoDocumentoEstudiante}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Nombre del Responsable Económico"
        name="nombreResponsable"
        value={formulario.nombreResponsable}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Documento del Responsable Económico"
        name="documentoResponsable"
        value={formulario.documentoResponsable}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Lugar de Expedición"
        name="lugarExpedicionResponsable"
        value={formulario.lugarExpedicionResponsable}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Teléfono del Responsable Económico"
        name="telefonoResponsable"
        value={formulario.telefonoResponsable}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Correo del Responsable Económico"
        name="correoResponsable"
        value={formulario.correoResponsable}
        onChange={manejarCambio}
        required
        type="email"
      />
      {errores.correoResponsable && (
        <div className="advertencia-correo">{errores.correoResponsable}</div>
      )}
      <ListaDesplegable
        label="Grado"
        name="grado"
        opciones={[ 'Prejardín', 'Jardín', 'Transición',
          'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto',
          'Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Once',
        ]}
        value={formulario.grado}
        onChange={manejarCambio}
        required
      />
      {opcionesCurso.length > 0 && (
        <ListaDesplegable
          label="Curso"
          name="curso"
          opciones={opcionesCurso}
          value={formulario.curso}
          onChange={manejarCambio}
          required
        />
      )}
      <CampoTexto
        label="Contraseña"
        name="contrasena"
        type="password"
        value={formulario.contrasena}
        onChange={manejarCambio}
        required
      />
      <CampoTexto
        label="Confirmación de Contraseña"
        name="confirmacionContrasena"
        type="password"
        value={formulario.confirmacionContrasena}
        onChange={manejarCambio}
        required
      />
      {/* Agregar el componente de reCAPTCHA */}
      <div className="captcha-container">
        <ReCAPTCHA
          sitekey="6LcD-YQqAAAAAKmisLvpnV7EHvNoN7w-ZDUYpJsA"
          onChange={manejarCaptcha}
        />
      </div>
      <div className="form-buttons">
      <Boton 
          label="Registrar" 
          onClick={handlePrincipal}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: captchaValido ? 'pointer' : 'not-allowed',
          }}
        />
      </div>
    </form>
  );
};

export default FormularioRegistro;
