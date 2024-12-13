import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useEffect, useState, useRef } from 'react';
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