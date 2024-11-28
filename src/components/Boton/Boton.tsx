import React from 'react';

// Definir las props usando TypeScript
interface BotonProps {
  label: string; // Etiqueta del botón
  onClick: () => void; // Función que se ejecuta al hacer clic
  style?: React.CSSProperties; // Estilo opcional del botón
}

const Boton: React.FC<BotonProps> = ({ label, onClick, style }) => {
  return (
    <button onClick={onClick} style={style}>
      {label}
    </button>
  );
};

export default Boton;
