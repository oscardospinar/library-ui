import React, { ReactElement } from 'react';
import '../../Css/SearchCss.css';

const SearchingPopup: React.FC = (): ReactElement => (
  <div className="popup-overlay">
    <div className="popup">
      <p>Buscando en la base de datos...</p>
      <div className="loader"></div>
    </div>
  </div>
);

export default SearchingPopup;
