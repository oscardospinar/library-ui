import { Box, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, Switch, FormControlLabel } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Category } from '../Services/category';
import { updateCategory, saveCategory } from '../../Hook/CategoryService'; 
import React, { useState } from 'react';
import { useBooks } from '../../../components/BookContext/useBooks';

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
  const { setShowErrorMessageB, setShowSuccessMessageB, setShowWarningMessageB } = useBooks();
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
      setShowWarningMessageB("El nombre no puede ser vacío");
      return;
    }
    if(isEdit){
      updateACategory();
    }else{
      createACategory();
    }
    
  };

  const updateACategory = async () => {
    try{
      const response = await updateCategory(editedCategory.categoryId,editedCategory.description);
      setShowSuccessMessageB('Categoría actualizada correctamente '+response?.data.message);
      onClose();
      
    }catch(error){
      setShowErrorMessageB("No se pudo actualizar la categoría "+error);
    } 
  }

  const createACategory = async () => {
    try{
      const response = await saveCategory(editedCategory.description);
      setShowSuccessMessageB('Categoría creada correctamente '+response?.data.message);
      onClose();
    }catch(error){
      setShowErrorMessageB("No se pudo crear la categoría "+error);
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
            label="Nombre"
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

  

  

