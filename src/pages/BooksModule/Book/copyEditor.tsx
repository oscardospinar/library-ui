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
import OpenBarcode from "../../../components/Barcode/OpenBarcode";
import { useBooks } from "../../../components/BookContext/useBooks";

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
  const { setShowErrorMessageB, setShowSuccessMessageB, setShowWarningMessageB } = useBooks();
  const [openBarCode, setOpen] = React.useState(false);
  const [base64, setBase] = React.useState(copy.barCode);

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
      setShowWarningMessageB("Complete todos los campos");
      return;
    }
    if (isEdit) {
      updateACopy();
    } else {
      createACopy();
    }
  };

  const updateACopy = async () => {
    try{
      if (editedCopy.id) {
        const response = await updateCopy(
          editedCopy.id,
          editedCopy.state,
          editedCopy.ubication,
          editedCopy.disponibility
        );
        setShowSuccessMessageB("Copia actualizada correctamente "+ response?.data.message);
        onClose();
        
      }
    }catch(error){
      setShowErrorMessageB("No se puedo actualizar la copia "+error);
    } 
  };

  const createACopy = async () => {
    try{
      const response = await newCopy(
        idBook,
        editedCopy.state,
        editedCopy.ubication
      );
      if (response) {
        setShowSuccessMessageB("Copia creada correctamente "+response.message);
        setBase(response.body);
        handleClickOpen();
      } 
    }catch(error){
      setShowErrorMessageB("No se puedo crear la copia "+error);
    } 
  };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
      setOpen(false);
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

          {isEdit && <Barcode
            bookId={editedCopy.book}
            handleClickOpen={handleClickOpen}
          />}
          <OpenBarcode src={base64}
                  open={openBarCode}
                  onClose={handleClose} 
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
