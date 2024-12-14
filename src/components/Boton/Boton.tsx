import React from 'react';

interface BotonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

const Boton: React.FC<BotonProps> = ({ label, onClick, style }) => {
  return (
    <button onClick={onClick} style={style}>
      {label}
    </button>
  );
};

export default Boton;
