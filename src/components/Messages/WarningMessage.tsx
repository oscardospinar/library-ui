import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


interface WarningMessageProps {
    message: string
    onClose: () => void;
  }

  export default function WarningMessage({ message, onClose }: WarningMessageProps) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={true}
        onClose={onClose}
        autoHideDuration={5000} 
      >
        <Alert
            onClose={onClose}
            severity="warning"
            variant="filled"
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
        </Snackbar>
    );
  }