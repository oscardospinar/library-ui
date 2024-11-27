import React, { useState } from 'react';
import './Prestamos.css';

interface PrestamosProps {
  onSuccess: () => void;
}

function Prestamos({ onSuccess }: PrestamosProps) {
  const [codigoEstudiante, setCodigoEstudiante] = useState('');
  const [codigoLibro, setCodigoLibro] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Registrar préstamo:', { codigoEstudiante, codigoLibro });
    onSuccess();
  };

  return (
    <div className="container">
      <div className="heading">Registrar un préstamo</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          className="input"
          id="codigoEstudiante"
          placeholder="Código del estudiante"
          value={codigoEstudiante}
          onChange={(e) => setCodigoEstudiante(e.target.value)}
        />
        <input
          required
          className="input"
          id="codigoLibro"
          placeholder="Código del libro"
          value={codigoLibro}
          onChange={(e) => setCodigoLibro(e.target.value)}
        />
        <input className="login-button" type="submit" value="Registrar" />
      </form>
      <span className="agreement">
        <a href="#">Gestión de préstamos</a>
      </span>
    </div>
  );
}

export default Prestamos;
