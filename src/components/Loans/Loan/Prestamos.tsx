import React, { useState } from 'react';
import './Prestamos.css';

interface PrestamosProps {
  onSuccess: () => void;
  onClose: () => void; // Asegúrate de pasar esta prop desde el componente principal
}

function Prestamos({ onSuccess, onClose }: PrestamosProps) {
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
        <div className="form-actions">
          <input className="login-button" type="submit" value="Registrar" />
          <button type="button" className="login-button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </form>
      <span className="agreement">
        <a href="#">Gestión de préstamos</a>
      </span>
    </div>
  );
}

export default Prestamos;
