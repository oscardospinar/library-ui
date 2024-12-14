import React from "react";
import { Dialog } from "@mui/material";
import PrestamosPage from "./PrestamosPage";

type PrestamosDialogProps = {
  open: boolean;
  onClose: () => void;
};

const PrestamosDialog: React.FC<PrestamosDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <PrestamosPage onClose={onClose} />
    </Dialog>
  );
};

export default PrestamosDialog;