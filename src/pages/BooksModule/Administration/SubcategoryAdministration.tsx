'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Subcategory } from '../Services/Subcategory';
import SubcategoryEditor from '../Book/subcategoryEditor';
import { getSubcategories, getSubcategory, deleteSubcategory } from '../../Hook/SubcategoryService';
import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { PaginationTable } from '../../../components/BookPagination/PaginationTable';

export const emptySubcategory: Subcategory = {
  subcategoryId: "",
  description: "",
  active: false 
};


export default function SubategoryAdministration() {
  const [openEditor, setOpenEditor] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>(emptySubcategory);
  const [title, setTitle] = useState<string>("Añadir Subcategoría");
  const [edit, setEdit] = useState<boolean>(false);
  const [initialSubcategories,setSubcategories] = useState<Subcategory[] >([]);
  
  const handleEdit = async (subcategoryId: string | undefined) => {
    if (subcategoryId) {
      getASubcategory(subcategoryId);  
    }
  };

  useEffect(() => {
        getAllSubcategories();
      }, []); 

  const getAllSubcategories = async () => {
    const answer = await getSubcategories();
    if (answer) {
      if(answer.data){
          setSubcategories(answer.data.body);
        }
      }
  };
  
  const getASubcategory = async (id: string)  => {
    const answer = await getSubcategory(id);
    if (answer && answer.data.body.length === 1) {
      setSelectedSubcategory(answer.data.body[0]); 
      setTitle("Editar Subcategoría");
      setEdit(true);
      setOpenEditor(true); 
    }
    
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
    setSelectedSubcategory(emptySubcategory);
    setTitle("Añadir Subcategoría");
    setEdit(false);
  };

  const handleAdd = () => {
    setOpenEditor(true); 
  };

  const deleteASubcategory = async (id: string ) => {
    if(id){
      const answer = await deleteSubcategory(id);
      if (answer) {
        console.log(answer);
      }
    }
  };

  const handleDelete = (subcategoryId: string | undefined) => {
    if(subcategoryId){
      deleteASubcategory(subcategoryId);
    }
  };

  return (
    <>
    <PaginationTable books={initialSubcategories}>
    {(paginatedBooks) => (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Gestión de Subcategorías
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
                {paginatedBooks.map((row) => (
                  <TableRow
                    key={row.subcategoryId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.subcategoryId}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="outlined" aria-label="crud button group">
                        <Button startIcon={<EditIcon />} onClick={() => handleEdit(row.subcategoryId)}>
                          Editar
                        </Button>
                        <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.subcategoryId)}>
                          Eliminar
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {openEditor && selectedSubcategory && (
            <Box mt={2}>
              <SubcategoryEditor isEdit={edit} title= {title} open={openEditor} subcategory={selectedSubcategory} onClose={handleCloseEditor} />
            </Box>
          )}
        </Box> </Box>)}
    </PaginationTable>
    </>
  );
}