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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Subcategory } from '../Services/Subcategory';
import SubcategoryEditor from '../Book/subcategoryEditor';
import { getBooksBySubcategories } from '../../Hook/BookService';
import React, { useState } from 'react';


interface Props {
    initialSubcategories: Subcategory[];
}

export default function SubategoryAdministration(props: Props) {

  const {initialSubcategories} = props;
  const [openEditor, setOpenEditor] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);

  
  const handleEdit = async (subcategoryId: string | undefined) => {
    if (subcategoryId) {
      const subcategory = await getASubcategory(subcategoryId);
      setSelectedSubcategory(subcategory); 
      setOpenEditor(true);
    }
  };

  
  const getASubcategory = async (id: string): Promise<Subcategory | null> => {
    const answer = await getBooksBySubcategories(id);
    if (answer && answer.data.body.length === 1) {
      return answer.data.body[0]; 
    }
    return null;
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
    setSelectedSubcategory(null); 
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
            {initialSubcategories.map((row) => (
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
      {openEditor && selectedSubcategory && (
        <Box mt={2}>
          <SubcategoryEditor open={openEditor} subcategory={selectedSubcategory} onClose={handleCloseEditor} />
        </Box>
      )}
    </div>
  );
}