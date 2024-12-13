import { Box, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, Switch, FormControlLabel } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Category } from '../Services/category';
import { updateCategory, saveCategory } from '../../Hook/CategoryService'; 
import React, { useState, useEffect } from 'react';

export default function CategoryEditor({
  category,
  open,
  onClose,
  title,
  isEdit
}: {
  category: Category;
  open: boolean;
  onClose: () => void;
  title: string;
  isEdit: boolean;
}) {

  const [editedCategory, setEditedCategory] = useState<Category>({
    ...category
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setEditedCategory((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleSave = async () => {
    if (!editedCategory.description.trim()) {
      alert('La descripción no puede ser vacía');
      return;
    }
    if(isEdit){
      updateACategory();
    }else{
      createACategory();
    }
    
  };

  const updateACategory = async () => {
    const response = await updateCategory(editedCategory.categoryId,editedCategory.description);
    if (response) {
      alert('Categoría actualizada correctamente');
      onClose();
    } else {
      alert('Error al actualizar categoria');
    }
  }

  const createACategory = async () => {
      const response = await saveCategory(editedCategory.description);
      if (response) {
        alert("Categoría creada correctamente");
        onClose();
      } else {
        alert("Error al crear la categoría");
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
            value={editedCategory.description}
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

  

  

