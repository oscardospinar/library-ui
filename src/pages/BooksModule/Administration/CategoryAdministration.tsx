'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Category } from '../Services/category';
import CategoryEditor from '../Book/categoryEditor';
import { getBookByCategory } from '../../Hook/BookService';


interface Props {
  initialCategories: Category[];
}

export default function CategoryAdministration(props: Props) {
  const { initialCategories } = props;
  const [openEditor, setOpenEditor] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);


  const handleEdit = async (categoryId: string | undefined) => {
    if (categoryId) {
      const category = await getACategory(categoryId);
      setSelectedCategory(category);  
      setOpenEditor(true);  
    }
  };

  
  const getACategory = async (id: string): Promise<Category | null> => {
    const answer = await getBookByCategory(id);
    if (answer && answer.data.body.length === 1) {
      return answer.data.body[0]; 
    }
    return null;
  };

 
  const handleCloseEditor = () => {
    setOpenEditor(false);
    setSelectedCategory(null);
  };

  return (
    <div>
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
            {initialCategories.map((row) => (
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
                    <Button color="error" startIcon={<DeleteIcon />}>
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
          <CategoryEditor open={openEditor} category={selectedCategory} onClose={handleCloseEditor} />
        </Box>
      )}
    </div>
  );
}
