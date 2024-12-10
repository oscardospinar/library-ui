import { Box, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, Switch, FormControlLabel } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Subcategory } from '../Services/Subcategory';
import { updateSubcategory } from '../../Hook/BookService'; 
import React, { useState, useEffect } from 'react';

export default function CategoryEditor({
  subcategory,
  open,
  onClose
}: {
    subcategory: Subcategory;
  open: boolean;
  onClose: () => void;
}) {

  const [editedSubcategory, setEditedSubcategory] = useState<Subcategory>({
    ...subcategory,
    active: subcategory.active || false 
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name) {
        setEditedSubcategory((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedSubcategory((prev) => ({
      ...prev,
      active: event.target.checked
    }));
  };

  const handleSave = async () => {
    if (!editedSubcategory.description.trim()) {
      alert('Please complete the description.');
      return;
    }
    const response = await updateSubcategory(editedSubcategory);
    if (response) {
      alert('Category updated successfully');
      onClose();
    } else {
      alert('Failed to update Subcategory.');
    }
  };
  const updateNewSubcategory = async()=>{ 
    const answer = await updateSubcategory(editedSubcategory);
    if(answer){ 
        alert("hola")
    }
  }


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}> Editar Subcategoría
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
          <FormControlLabel
            control={
              <Switch
                checked={editedSubcategory.active}
                onChange={handleActiveChange}
                name="active"
                color="primary"
              />
            }
            label="Activo"
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

  

  

