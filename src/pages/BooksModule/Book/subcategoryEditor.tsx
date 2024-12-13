import { Box, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, Switch, FormControlLabel } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Subcategory } from '../Services/Subcategory';
import { updateSubcategory, saveSubcategory } from '../../Hook/SubcategoryService'; 
import React, { useState, useEffect } from 'react';

export default function SubcategoryEditor({
  subcategory,
  open,
  onClose,
  title,
  isEdit
}: {
    subcategory: Subcategory;
  open: boolean;
  onClose: () => void;
  title: string;
  isEdit: boolean;
}) {

  const [editedSubcategory, setEditedSubcategory] = useState<Subcategory>({
    ...subcategory
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name) {
        setEditedSubcategory((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!editedSubcategory.description.trim()) {
      alert('La descripción no puede ser vacía');
      return;
    }
    if(isEdit){
      updateASubcategory();
    }else{
      createASubcategory();
    }
    
  };

  const updateASubcategory = async () => {
    if(editedSubcategory.subcategoryId){
      const response = await updateSubcategory(editedSubcategory.subcategoryId,editedSubcategory.description);
      if (response) {
        alert('Subcategoría actualizada correctamente');
        onClose();
      } else {
        alert('Error al actualizar subcategoría');
      }
    }
  }

  const createASubcategory = async () => {
    const response = await saveSubcategory(editedSubcategory.description);
    if (response) {
      alert("Subcategoría creada correctamente");
      onClose();
    } else {
      alert("Error al crear la subcategoría");
    }
}


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}> {title}
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
          <Close/>
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
          }}>
          <TextField
            label="Descripción"
            name="description"
            value={editedSubcategory.description}
            onChange={handleChange}
            fullWidth
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

  

  

