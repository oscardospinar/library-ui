import React, { useState } from "react";
import "./Prestamos.css";

interface PrestamosProps {
  onSuccess: () => void;
  onClose: () => void;
  idCopia?: string | null;
}

function Prestamos({ onSuccess, onClose, idCopia }: PrestamosProps) {
  const [codigoEstudiante, setCodigoEstudiante] = useState("");
  const [codigoLibro, setCodigoLibro] = useState(idCopia || "");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Registrar préstamo:", { codigoEstudiante, codigoLibro });
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
          disabled={!!idCopia}
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
