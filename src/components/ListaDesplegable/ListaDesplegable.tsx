import React from 'react';

interface ListaDesplegableProps {
  label: string;
  name: string;
  opciones: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const ListaDesplegable: React.FC<ListaDesplegableProps> = ({ label, name, opciones, value, onChange }) => (
  <div>
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange} required>
      <option value="">Seleccione una opción</option>
      {opciones.map((opcion, index) => (
        <option key={index} value={opcion}>
          {opcion}
        </option>
      ))}
    </select>
  </div>
);

export default ListaDesplegable;
