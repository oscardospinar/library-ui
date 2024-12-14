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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Prepara el objeto JSON para el request
    const loanRequest = {
      studentId: codigoEstudiante,
      copyId: codigoLibro,
      token: "",
    };

    try {
      // Realiza la solicitud POST a la API sin los encabezados de autenticación
      const response = await fetch(
        "https://bibliosoftloanback-ahecc7fydjdze0ar.canadacentral-01.azurewebsites.net/loans/requestLoan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loanRequest), // Convierte el objeto a JSON
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud. Intenta nuevamente.");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);
      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      setError("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="container">
      <div className="heading">Registrar un préstamo</div>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Mostrar mensaje de error */}
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
          <button type="button" className="login-button" onClick={handleClose}>
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