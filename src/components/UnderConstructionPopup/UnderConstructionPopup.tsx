import React, { ReactElement } from 'react';
import '../../Css/SearchCss.css';

interface UnderConstructionPopupProps {
  onClose: () => void; // Prop que define la función para manejar el cierre
}

const UnderConstructionPopup: React.FC<UnderConstructionPopupProps> = ({
  onClose,
}): ReactElement => (
  <div className="popup-overlay">
    <div className="popup">
      <p>Esta funcionalidad está en construcción</p>
      <button onClick={onClose}>Ok</button>
    </div>
  </div>
);

export default UnderConstructionPopup;
