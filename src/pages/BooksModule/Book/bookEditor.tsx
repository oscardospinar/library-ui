import { Box, Typography, TextField, Button, Chip, IconButton, Select, MenuItem,} from '@mui/material';
import { BookObj } from "../Services/BookObj";
import { updateBook } from "../../Hook/BookService";
import { getCategories } from '../../Hook/BookService';
import React, { ReactElement, useEffect, useState } from "react";
import { Category } from '../Services/category';
export default function BookEditor({ 
    book
     }: {
    book:BookObj;

}) {
{/*estado inical del libro */}
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [editedBook, setEditedBook] = React.useState<BookObj>({
    ...book,
    subcategories: book.subcategories || ''
  })
{/*manejo de cambios y guardar*/}
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
  const handleSave = () => {
    if (!editedBook.title.trim() || !editedBook.author.trim()) {
      alert(' Complete title and author.');
      return;
    }
    /*onSave(editedBook);*/
  };
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const category = event.target.value as string;
    setEditedBook((prev) => ({
      ...prev,
      category,
      subcategories: [] 
    }));
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEditedBook((prev) => ({
      ...prev,
      subcategories: event.target.value as string[]
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
  const getAllCategories = async () => {
    const answer = await getCategories();
    if(answer){ 
      console.log(answer.data.body);
      setCategories(answer.data.body);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, maxWidth: '1000px', margin: 'auto', padding: 3 }}>

      {/* Formulario */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {editedBook.title|| 'Editar libro'}
          </Typography>
          <Box>
            <IconButton aria-label="editar">
              <Typography>✏️</Typography>
            </IconButton>
            <IconButton aria-label="eliminar">
              <Typography>🗑️</Typography>
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 2 }}>
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
          <Select
            value={editedBook.categories || ''}
            displayEmpty
            fullWidth
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category.categoryId}>
                {category.description}
              </MenuItem>
            ))}
        </Select>
          <TextField
            label="Subcategorías"
            name="subcategories"
            value={editedBook.subcategories}
            onChange={handleChange}
            fullWidth
            helperText="Please,enter subcategories with comma "
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          { /*<Button variant="outlined" onClick={onCancel}>Cancelar</Button>*/}
            {/*<Button variant="contained" onClick={() => onSave(editedBook)}>Guardar cambios</Button>*/}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}