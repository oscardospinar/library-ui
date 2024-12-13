import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { updateCopy, newCopy } from "../../Hook/CopyService";
import { Copy } from "../Services/Copy";
import Barcode from "../../../components/Barcode/Barcode";

export default function CopyEditor({
  copy,
  open,
  onClose,
  title,
  isEdit,
  idBook,
}: {
  copy: Copy;
  open: boolean;
  onClose: () => void;
  title: string;
  isEdit: boolean;
  idBook: string;
}): ReactElement {
  const [editedCopy, setEditedCopy] = useState<Copy>({
    ...copy,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    if (name) {
      setEditedCopy((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (!editedCopy.ubication.trim() || !editedCopy.state.trim()) {
      alert("Complete todos los campos.");
      return;
    }
    if (isEdit) {
      updateACopy();
    } else {
      createACopy();
    }
  };

  const updateACopy = async () => {
    if (editedCopy.id) {
      const response = await updateCopy(
        editedCopy.id,
        editedCopy.state,
        editedCopy.ubication,
        editedCopy.disponibility
      );
      if (response) {
        alert("Copia actualizada correctamente");
        onClose();
      } else {
        alert("Error al cargar la copia");
      }
    }
  };

  const createACopy = async () => {
    const response = await newCopy(
      idBook,
      editedCopy.state,
      editedCopy.ubication
    );
    if (response) {
      alert("Copia creada correctamente");
      console.log(response);
      onClose();
    } else {
      alert("Error al crear la copia");
    }
  };

  // Función para validar y adaptar el valor base64 para el código de barras
  const getValidBase64Image = (base64: string | undefined): string => {
    if (!base64) {
      return "";
    }
    if (!base64.startsWith("data:image")) {
      return `data:image/png;base64,${base64}`; 
    }
    return base64; 
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
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
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: "1000px",
            margin: "auto",
            padding: 3,
          }}
        >
          <TextField
            id="ubication-input"
            label="Ubicación"
            name="ubication"
            value={editedCopy.ubication}
            onChange={handleChange}
            fullWidth
            variant="filled"
          />
          <TextField
            id="state-input"
            label="Estado"
            name="state"
            value={editedCopy.state}
            onChange={handleChange}
            fullWidth
            variant="filled"
          />

          <Barcode
            bookId={editedCopy.book}
            src={getValidBase64Image(editedCopy.barCode)}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
