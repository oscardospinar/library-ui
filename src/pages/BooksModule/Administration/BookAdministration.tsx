'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { BasicBook } from '../Services/BasicBook';
import BookEditor from '../Book/bookEditor';
import { BookObj } from "../Services/BookObj";
import { getBook, deleteBook,getAllBooks } from "../../Hook/BookService";
import ClassIcon from '@mui/icons-material/Class';
import IconButton from '@mui/material/IconButton';
import CopyAdministration from './CopyAdministration';
import { PaginationTable } from '../../../components/BookPagination/PaginationTable';
import { useBooks } from '../../../components/BookContext/useBooks';

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


export default function BookAdministration() {
  const { setShowErrorMessageB, setShowSuccessMessageB, setShowWarningMessageB } = useBooks();
  const [openEditor, setOpenEditor] = useState(false);
  const [book, setBook] = useState<BookObj>(emptyBook);
  const [title, setTitle] = useState<string>("Añadir libro");
  const [edit, setEdit] = useState<boolean>(false);
  const [initialBooks,setBooks] = useState<BasicBook[] >([]);
  const [showCopies, setShowCopies] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);


  useEffect(() => {
    getBooks();
  }, []); 

  const handleEdit = (bookId: string | undefined) => {
    if(bookId){
      getABook(bookId);
    }
  };
  const getBooks = async () => {
    try{
      console.log("hola");
      const answer = await getAllBooks();
      setBooks(answer.data.body);
    }catch(error){
      setShowErrorMessageB("Error al cargar los libros "+error);
    }
  };

  const getABook = async (id: string ) => {
    try{
      if(id){
        const answer = await getBook(id);
        const book: BookObj | undefined = answer.data.body && answer.data.body.length === 1 
            ? answer.data.body[0] 
            : undefined;
        if (book) {
          setBook(book);
          setTitle("Editar Libro");
          setEdit(true);
          setOpenEditor(true); 
        }
      }
    
    }catch(error){
      setShowErrorMessageB("Error al cargar el libro "+error);
    }
  };

  const deleteABook = async (id: string ) => {
    try{
      if(id){
        const answer = await deleteBook(id);
        setShowSuccessMessageB("Libro eliminado correctamente "+ answer.data.message);
      }
    }catch(error){
      setShowErrorMessageB("Error al eliminar el libro "+error);
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
  
  const copiesPage = (bookId: string | undefined) => {
    if(bookId){
      setId(bookId);
      setShowCopies(true);
    }
  };

  return (
    <>
    {!showCopies ? (
      <PaginationTable books={initialBooks}>
        {(paginatedBooks) => (
      <Box>
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
              {paginatedBooks.map((row) => (
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
                    <ButtonGroup  aria-label="Basic button group" >
                        <IconButton  color="primary" onClick={() => handleEdit(row.bookId)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error"  onClick={() => handleDelete(row.bookId)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="warning"  onClick={() => copiesPage(row.bookId)} >
                          <ClassIcon />
                        </IconButton>
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
      </Box>)}</PaginationTable>) :
    (id && <CopyAdministration bookId={id} />)}
    </>
  );
}
