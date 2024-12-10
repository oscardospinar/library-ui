// DialogWrapper.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';

interface DialogWrapperProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({ open, onClose, title, children }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            maxWidth: '1000px',
            margin: 'auto',
            padding: 3,
          }}
        >
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
