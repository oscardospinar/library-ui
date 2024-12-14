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
  Typography,
  Chip 
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { BookObj } from "../Services/BookObj";
import { updateBook, uploadBookImage, saveBook } from "../../Hook/BookService";
import { getCategories } from "../../Hook/CategoryService";
import { getSubcategories } from "../../Hook/SubcategoryService";
import { Category } from "../Services/category";
import { Subcategory } from "../Services/Subcategory";
import ClassIcon from '@mui/icons-material/Class';
import { useBooks } from "../../../components/BookContext/useBooks";

export default function BookEditor({
  book,
  open,
  onClose,
  title,
  isEdit
}: {
  book: BookObj;
  open: boolean;
  onClose: () => void;
  title: string
  isEdit: boolean
}) {
  const { setShowErrorMessageB, setShowSuccessMessageB, setShowWarningMessageB } = useBooks();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesIds, setCategoriesIds] = useState<string[]>([]);
  const [subcategoriesIds, setSubcategoriesIds] = useState<string[]>([]);
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



  const handleSave = () => {
    if (!editedBook.title.trim() || !editedBook.author.trim() || !editedBook.collection.trim() || !editedBook.editorial.trim() || !editedBook.recommendedAges.trim()
    || !editedBook.edition.trim() || !editedBook.description.trim() || !editedBook.isbn.trim() || !editedBook.language.trim()) {
      setShowWarningMessageB("Complete todos los campos");
      return;
    }
    if(isEdit){
      updateABook();
    }else{
      createABook();
    }
  }

  const uploadImage = async (bookId: string | undefined) => {
    try{
      if (selectedImage) {
        if(bookId){
          const imagePath = await uploadBookImage(selectedImage, bookId);
          setShowSuccessMessageB("Imagen cargada correctamente "+imagePath.message);
        }
      }
    }catch(error){
      setShowErrorMessageB("No se puedo cargar la imagen "+error);
    } 
  }

  const updateABook = async () => {
    try{
      const response = await updateBook(editedBook.bookId, editedBook.isbn, editedBook.description, editedBook.title, editedBook.author, editedBook.collection, editedBook.editorial, editedBook.edition,
        editedBook.recommendedAges, editedBook.language, categoriesIds, subcategoriesIds);
      setShowSuccessMessageB("Libro actualizado correctamente " + response.data.message);
      uploadImage(book.bookId);
      onClose();
  
    }catch(error){
      setShowErrorMessageB("No se puedo actualizar el libro "+error);
    } 
  }

  const createABook = async () => {
    try{
      const response = await saveBook(editedBook.isbn, editedBook.description, editedBook.title, editedBook.author, editedBook.collection, editedBook.editorial, editedBook.edition,
        editedBook.recommendedAges, editedBook.language, categoriesIds, subcategoriesIds);
      uploadImage(response.data.body);
      setShowSuccessMessageB("Libro actualizado correctamente " + response.data.message);
      onClose();
    }catch(error){
      setShowErrorMessageB("No se puedo crear libro "+error);
    } 
  }


  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const category = event.target.value as string;
    setCategoriesIds([...categoriesIds, category]);
    const categoryName = categories.find(cat => cat.categoryId === category)?.description;
    setEditedBook((prev) => ({
      ...prev,
      categories: [
        ...(prev.categories || []), 
        categoryName || "" 
      ]
    }));
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const subcategory = event.target.value as string;
    setSubcategoriesIds([...subcategoriesIds, subcategory]);
    const subcategoryName = subcategories.find(cat => cat.subcategoryId === subcategory)?.description;
    setEditedBook((prev) => ({
      ...prev,
      subcategories: [
        ...(prev.subcategories || []), 
        subcategoryName || "" 
      ]
    }));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllSubcategories();
  }, []);

  const getAllCategories = async () => {
    try{
      const answer = await getCategories();
      setCategories(answer.data.body);
    }catch(error){
      setShowErrorMessageB("No se puedo cargar las categorías "+error);
    } 
  };

  const getAllSubcategories = async () => {
    try{
      const answer = await getSubcategories();
      setSubcategories(answer.data.body);
    }catch(error){
      setShowErrorMessageB("No se puedo cargar las subcategorías "+error);
    } 
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
            label="Colección"
            name="collection"
            value={editedBook.collection}
            onChange={handleChange}
            multiline
            fullWidth
          />
          <TextField
            label="Edad recomendada"
            name="recommendedAges"
            value={editedBook.recommendedAges}
            onChange={handleChange}
            multiline
            fullWidth
          />
          <TextField
            label="Idioma"
            name="language"
            value={editedBook.language}
            onChange={handleChange}
            multiline
            fullWidth
          />
          <Box>
              <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
                Categorías:
              </Typography>
              {editedBook.categories.map((category, index) => (
                    <Chip key={index} label={category} sx={{ mr: 1, mb: 1 }} />
              ))}
          </Box>
          <TextField
            select
            label="Categorías"
            name="categories"
            value={""}
            onChange={handleCategoryChange}
            fullWidth
            variant="outlined"
          >
            {categories
            .filter((category) => !editedBook.categories.includes(category.description) && category.active) 
            .map((category, index) => (
              <MenuItem key={index} value={category.categoryId}>
                {category.description}
              </MenuItem>
            ))}
          </TextField>
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
                Subcategorías:
            </Typography>
            {editedBook.subcategories.map((sub, index) => (
              <Chip key={index} label={sub} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          <TextField
            select
            label="Subcategorías"
            name="subcategories"
            value={""}
            onChange={handleSubcategoryChange}
            fullWidth
            variant="outlined"
          >
            {subcategories
            .filter((subcategory) => !editedBook.subcategories.includes(subcategory.description) && subcategory.active) 
            .map((subcategory, index) => (
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

          <Box sx={{ display: "flex", justifyContent:"flex-end", gap: 1, mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
          </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
