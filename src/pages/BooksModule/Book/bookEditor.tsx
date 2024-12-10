import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography 
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { BookObj } from "../Services/BookObj";
import { updateBook, uploadBookImage } from "../../Hook/BookService";
import { getCategories } from "../../Hook/BookService";
import { getSubcategories } from "../../Hook/BookService";
import { Category } from "../Services/category";
import { Subcategory } from "../Services/Subcategory";

export default function BookEditor({
  book,
  open,
  onClose,
}: {
  book: BookObj;
  open: boolean;
  onClose: () => void;
}) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editedBook, setEditedBook] = useState<BookObj>({
    ...book,
    subcategories: book.subcategories || [],
    categories: book.categories || [],
  });
  const [imagePreview, setImagePreview] = useState<string | null>(book.imgPath || null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
      alert("Complete title and author.");
      return;
    }

    if (!book.bookId) {
      alert("ID doesnt defined.");
      return;
    }

    if (selectedImage) {
      try {
        const imagePath = await uploadBookImage(selectedImage, book.bookId);
        editedBook.imgPath = imagePath;
      } catch (error) {
        alert("Error uploading the image");
        return;
      }
    }
    
    const response = await updateBook(editedBook);
    if (response) {
      alert("Book updated successfully");
      onClose();
    } else {
      alert("Failed to update book.");
    }

  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const category = event.target.value as string;
    setEditedBook((prev) => ({
      ...prev,
      categories: [category],
    }));
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const subcategory = event.target.value as string;
    setEditedBook((prev) => ({
      ...prev,
      subcategories: [subcategory],
    }));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllSubcategories();
  }, []);

  const getAllCategories = async () => {
    const answer = await getCategories();
    if (answer) {
      setCategories(answer.data.body);
    }
  };

  const getAllSubcategories = async () => {
    const answer = await getSubcategories();
    if (answer) {
      setSubcategories(answer.data.body);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Editar Libro
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
            value={editedBook.categories[0] || ""}
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
            value={editedBook.subcategories[0] || ""}
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
          {/* Imagen */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1, mt: 2 }}>
            <Button variant="outlined" component="label" sx={{ alignSelf: "start" }}>
              Cambiar Portada del Libro
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedImage(e.target.files[0]);
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      setImagePreview(fileReader.result as string);
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
            </Button>
            <Typography variant="body2" color="textSecondary">
              {selectedImage ? selectedImage.name : "Ningún archivo seleccionado"}
            </Typography>
            {imagePreview && (
              <Box mt={2}>
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  style={{ width: "100%", maxWidth: "200px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)" }}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
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
  );
}
