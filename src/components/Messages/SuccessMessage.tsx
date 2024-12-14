import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


interface SuccessMessageProps {
    message: string
    onClose: () => void;
  }

  export default function SuccessMessage({ message, onClose }: SuccessMessageProps) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={true}
        onClose={onClose}
        autoHideDuration={5000} 
      >
        <Alert
            onClose={onClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
        </Snackbar>
    );
  }