import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


interface ErrorMessageProps {
    message: string
    onClose: () => void;
  }

  export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={true}
        onClose={onClose}
        autoHideDuration={5000} 
      >
        <Alert
            onClose={onClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
        </Snackbar>
    );
  }