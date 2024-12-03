import React from 'react';
import { CircularProgress } from '@mui/material';
import './SearchingPopup.css';

const SearchingPopup: React.FC = () => {
  const GradientCircularProgress: React.FC = () => (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </>
  );

  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>Buscando en la base de datos...</p>
        <GradientCircularProgress />
      </div>
    </div>
  );
};

export default SearchingPopup;
