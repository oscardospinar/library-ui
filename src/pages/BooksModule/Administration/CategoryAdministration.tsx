'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Category } from '../Services/category';
import CategoryEditor from '../Book/categoryEditor';
import { getCategories, getCategory, deleteCategory } from '../../Hook/CategoryService';
import { Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { PaginationTable } from '../../../components/BookPagination/PaginationTable';
import { useBooks } from '../../../components/BookContext/useBooks';

export const emptyCategory: Category = {
  categoryId: "",
  description: "",
  active: false 
};


export default function CategoryAdministration() {
  const { setShowErrorMessageB, setShowSuccessMessageB } = useBooks();
  const [openEditor, setOpenEditor] = useState(false);
  const [title, setTitle] = useState<string>("Añadir Categoría");
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(emptyCategory);
  const [initialCategories,setCategories] = useState<Category[] >([]);

  useEffect(() => {
      getAllCategories();
    }, []); 

    const getAllCategories = async () => {
      try{
        const answer = await getCategories();
        setCategories(answer.data.body);
      }catch(error){
        setShowErrorMessageB("Error al cargar las categorías "+error);
      }
    }

  const handleEdit = async (categoryId: string | undefined) => {
    if (categoryId) {
      getACategory(categoryId);  
    }
  };

  
  const getACategory = async (id: string) => {
    try{
      const answer = await getCategory(id);
      if (answer) {
        const category: Category | undefined = answer.data.body && answer.data.body.length === 1 
            ? answer.data.body[0] 
            : undefined;
          if (category) {
            console.log(category);
            setSelectedCategory(category);
            setTitle("Editar Categoría");
            setEdit(true);
            setOpenEditor(true); 
          }
      }
    }catch(error){
      setShowErrorMessageB("Error al obtener la categoría "+error);
    }
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
    setSelectedCategory(emptyCategory);
    setTitle("Añadir Categoría");
    setEdit(false);
  };

  const handleAdd = () => {
    setOpenEditor(true); 
  };

  const deleteACategory = async (id: string ) => {
    try{
      if(id){
        const answer = await deleteCategory(id);
        setShowSuccessMessageB("Categorías eliminada correctamente "+answer?.data.message);
      }
    }catch(error){
      setShowErrorMessageB("Error al eliminar la categoría "+error);
    }
  };

  const handleDelete = (categoryId: string | undefined) => {
    if(categoryId){
      deleteACategory(categoryId);
    }
  };

  return (
    <>
    <PaginationTable books={initialCategories}>
    {(paginatedBooks) => (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Gestión de categorías
          </Typography>
          <Button color="success" startIcon={<AddCircleIcon />} size="large" onClick={handleAdd}>
          </Button>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedBooks
                .filter((row) => row.active).map((row) => (
                  <TableRow
                    key={row.categoryId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.categoryId}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="outlined" aria-label="crud button group">
                        <Button startIcon={<EditIcon />} onClick={() => handleEdit(row.categoryId)}>
                          Editar
                        </Button>
                        <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.categoryId)}>
                          Eliminar
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {openEditor && selectedCategory && (
            <Box mt={2}>
              <CategoryEditor isEdit={edit} title={title} open={openEditor} category={selectedCategory} onClose={handleCloseEditor} />
            </Box>
          )}
        </Box></Box> )}
    </PaginationTable>
    </>
  );
}
