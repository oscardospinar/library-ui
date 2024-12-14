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
import CopyEditor from '../Book/copyEditor';
import { getAllCopies, getCopy } from '../../Hook/CopyService';
import { getCopiesByBook } from '../../Hook/BookService';
import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Copy } from '../Services/Copy';
import { deleteCopy } from "../../Hook/CopyService";
import { PaginationTable } from '../../../components/BookPagination/PaginationTable';
import { useBooks } from '../../../components/BookContext/useBooks';

export const emptyCopy: Copy = {
    id: "",
    book: "",
    state:"",
    barCode: "",
    ubication: "",
    disponibility: "",
    active: false 
};

interface Props {
  bookId: string;
}
export default function CopyAdministration(props: Props) {
  const { setShowErrorMessageB, setShowSuccessMessageB } = useBooks();
  const {bookId} = props;
  const [openEditor, setOpenEditor] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState<Copy>(emptyCopy);
  const [title, setTitle] = useState<string>("Añadir Copia");
  const [edit, setEdit] = useState<boolean>(false);
  const [initialCopies,setCopies] = useState<Copy[]>([]);
  
  const handleEdit = async (copyId: string | undefined) => {
    if (copyId) {
        getACopy(copyId);  
    }
  };

  useEffect(() => {
        getCopies();
    }, []); 

  const getCopies = async () => {
    try{
      const answer = await getCopiesByBook(bookId);
      setCopies(answer.data.body);
      }catch(error){
        setShowErrorMessageB("Error al cargar las copias "+error);
    }
  };
  
  const getACopy = async (id: string)  => {
    try{
      const answer = await getCopy(id);
      if (answer && answer.data.body.length === 1) {
          setSelectedCopy(answer.data.body[0]); 
          setTitle("Editar Copia");
          setEdit(true);
          setOpenEditor(true); 
      }
    }catch(error){
      setShowErrorMessageB("Error al obtener la copia "+error);
    }
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
    setSelectedCopy(emptyCopy);
    setTitle("Añadir Copia");
    setEdit(false);
  };

  const handleAdd = () => {
    setOpenEditor(true); 
  };

  const deleteACopy= async (id: string ) => {
    try{
      if(id){
        const answer = await deleteCopy(id);
        setShowSuccessMessageB("Copia eliminada correctamente "+answer?.data.message);
      }
    }catch(error){
      setShowErrorMessageB("Error al eliminar la copia "+error);
    }
  };

  const handleDelete = (copyId: string | undefined) => {
    if(copyId){
        deleteACopy(copyId);
    }
  };

  return (
    <>
    <PaginationTable books={initialCopies}>
    {(paginatedBooks) => (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Gestión de Copias 
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
                  <TableCell>Estado</TableCell>
                  <TableCell>Ubicacion</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedBooks
                .filter((row) => row.active)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: row.disponibility === 'AVAILABLE' ? 'inherit' : 'rgba(255, 235, 59, 0.3)' ,}} 
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell>{row.ubication}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="outlined" aria-label="crud button group">
                        <Button startIcon={<EditIcon />} onClick={() => handleEdit(row.id)}>
                          Editar
                        </Button>
                        <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.id)}>
                          Eliminar
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {openEditor && selectedCopy && (
            <Box mt={2}>
              <CopyEditor idBook={bookId} isEdit={edit} title= {title} open={openEditor} copy={selectedCopy} onClose={handleCloseEditor} />
            </Box>
          )}
        </Box>
        </Box>)}
    </PaginationTable>
    </>
  );
}