'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Icon from '@mui/material/Icon';
import { green } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { BasicBook } from '../Services/BasicBook';
import BookEditor from '../Book/bookEditor';
import { BookObj } from "../Services/BookObj";
import { getBook } from "../../Hook/BookService";

// Simulación de datos y operaciones de base de datos
interface Props {
    initialBooks: BasicBook[];
}

export default function BookAdministration(props: Props) {

  const {initialBooks} = props;
  const [openEditor, setOpenEditor] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BasicBook | null>(null);
  const [book, setBook] = useState<BookObj>();

  const handleEdit = (bookId: string | undefined) => {
    setOpenEditor(true);
    if(bookId){
      getABook(bookId);
  }
  };
  const getABook = async (id: string ) => {
    if(id){
      const answer = await getBook(id);
      if (answer) {
        const book: BookObj | undefined = answer.data.body && answer.data.body.length === 1 
          ? answer.data.body[0] 
          : undefined;
        if (book) {
          console.log(book);
          setBook(book);
        }
      }
    }
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
    setSelectedBook(null);
  };
  
  

  return (
    <Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell >Autor</TableCell>
            <TableCell >ISBN</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialBooks.map((row) => (
            <TableRow
              key={row.bookId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell >{row.author}</TableCell>
              <TableCell >{row.isbn}</TableCell>
              <TableCell align="right">
                <ButtonGroup variant="outlined" aria-label="crud botton group">
                    <Button  startIcon={<EditIcon />} onClick={() => handleEdit(row.bookId)}>
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
    
    {openEditor && book && (
      <Box mt={2}>
        <BookEditor open = {true} book={book} onClose={handleCloseEditor} />
      </Box>
      )}
    </Box>
  );
}
