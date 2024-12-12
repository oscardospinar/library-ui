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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { BasicBook } from '../Services/BasicBook';
import BookEditor from '../Book/bookEditor';
import { BookObj } from "../Services/BookObj";
import { getBook, deleteBook } from "../../Hook/BookService";

export const emptyBook: BookObj = {
  bookId: "",
  isbn: "",
  description: "",
  title: "",
  author: "",
  collection: "",
  editorial: "",
  edition: "",
  recommendedAges: "",
  language: "",
  categories: [],
  subcategories: [],
  copies: [], 
  imgPath: "", 
  active: false, 
};

interface Props {
    initialBooks: BasicBook[];
}

export default function BookAdministration(props: Props) {

  const {initialBooks} = props;
  const [openEditor, setOpenEditor] = useState(false);
  const [book, setBook] = useState<BookObj>(emptyBook);
  const [title, setTitle] = useState<string>("Añadir libro");
  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = (bookId: string | undefined) => {
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
          setTitle("Editar Libro");
          setEdit(true);
          setOpenEditor(true); 
        }
      }
    }
  };

  const deleteABook = async (id: string ) => {
    if(id){
      const answer = await deleteBook(id);
      if (answer) {
        console.log(answer);
      }
    }
  };

  const handleAdd = () => {
    setOpenEditor(true); 
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
    setBook(emptyBook);
    setTitle("Añadir libro");
    setEdit(false);
  };

  const handleDelete = (bookId: string | undefined) => {
    if(bookId){
      deleteABook(bookId);
    }
  };
  
  
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Gestión de libros
      </Typography>
      <Button color="success" startIcon={<AddCircleIcon />} size="large" onClick={handleAdd}>
      </Button>
    </Box>
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
                    <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.bookId)}>
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
        <BookEditor isEdit = {edit} title = {title} open = {true} book={book} onClose={handleCloseEditor} />
      </Box>
      )}
    </Box>
    </>
  );
}
