import React from 'react';
import { Button } from '@mui/material';
import styles from '../Mainsearch/Popups.module.css';

interface UnderConstructionPopupProps {
  onClose: () => void;
}

const UnderConstructionPopup: React.FC<UnderConstructionPopupProps> = ({ onClose }) => (
  <div className={styles.popupOverlay}>
    <div className={styles.popup}>
      <p>Esta funcionalidad está en construcción</p>
      <Button variant="contained" color="primary" onClick={onClose}>
        Ok
      </Button>
    </div>
  </div>
);

export default UnderConstructionPopup;
