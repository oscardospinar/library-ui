import { Box,TextField, Button, IconButton, MenuItem, Dialog, DialogTitle, DialogContent} from '@mui/material';
import { Close } from '@mui/icons-material';
import { BookObj } from "../Services/BookObj";
import { updateBook } from "../../Hook/BookService";
import { getCategories } from '../../Hook/BookService';
import { getSubcategories } from '../../Hook/BookService';
import React, { ReactElement, useEffect, useState } from "react";
import { Category } from '../Services/category';
import { Subcategory } from '../Services/Subcategory';

export default function BookEditor({
  book,
  open,
  onClose
}: {
  book: BookObj;
  open: boolean;
  onClose: () => void;
}) {

  

  const [subcategories, setSubcategories] = React.useState<Subcategory[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [editedBook, setEditedBook] = React.useState<BookObj>({
    ...book,
    subcategories: book.subcategories || ''
  })


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    if (name) {
      setEditedBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!editedBook.title.trim() || !editedBook.author.trim()) {
        alert('Complete title and author.');
        return;
    }
    const response = await updateBook(editedBook);
    if (response) {
        alert('Book updated successfully');
        onClose();
    } else {
        alert('Failed to update book.');
    }
};

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const category = event.target.value as string;
    setEditedBook((prev) => ({
        ...prev,
        category
    }));
};

const handleSubcategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const subcategory = event.target.value as string;
    setEditedBook((prev) => ({
        ...prev,
        subcategory
    }));
};

const updateNewBook = async()=>{ 
  const answer = await updateBook(editedBook);
  if(answer){ 
      alert("hola")
  }
}
useEffect (() => {
  getAllCategories();
},[]);
useEffect (() => {
  getAllSubcategories();
},[]);

const getAllCategories = async () => {
  const answer = await getCategories();
  if(answer){ 
    console.log(answer.data.body);
    setCategories(answer.data.body);
  }
}
const getAllSubcategories = async () => {
  const answer = await getSubcategories();
  if(answer){ 
    console.log(answer.data.body);
    setSubcategories(answer.data.body);
  }
}

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>Editar Libro
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
            }}
          >
          <TextField
            label="Título"
            name="title"
            value={editedBook.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Autor"
            name="author"
            value={editedBook.author}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Editorial"
            name="editorial"
            value={editedBook.editorial}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Edición"
            name="edition"
            value={editedBook.edition}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="ISBN"
            name="isbn"
            value={editedBook.isbn}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Descripción"
            name="description"
            value={editedBook.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            select
            label="Categorías"
            name="categories"
            value={editedBook.categories || ''}
            onChange={handleCategoryChange}
            fullWidth
            variant="outlined" 
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category.categoryId}>
                {category.description}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Subcategorías"
            name="subcategories"
            value={editedBook.subcategories || ''}
            onChange={handleSubcategoryChange}
            fullWidth
            variant="outlined" 
          >
            {subcategories.map((subcategory, index) => (
              <MenuItem key={index} value={subcategory.subcategoryId}>
                {subcategory.description}
              </MenuItem>
            ))}
          </TextField>
          
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

