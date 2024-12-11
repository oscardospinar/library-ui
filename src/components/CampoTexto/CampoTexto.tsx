import React from 'react';

interface CampoTextoProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const CampoTexto: React.FC<CampoTextoProps> = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default CampoTexto;
