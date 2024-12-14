import { ReactElement, useState } from "react";
import {
    Typography,
    Box,
    Container,
  } from '@mui/material';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { LoadCategories } from "./LoadCategories";
import * as React from 'react';
import { getBook } from "../../Hook/BookService";
import { BookObj } from "../Services/BookObj";
import { Copy } from "../Services/Copy";
import Book from "../Book";
import AdministrationPanel from "../Administration/AdministrationPanel";
import { BookProvider } from "../../../components/BookContext/useBooks";
import { useBooks } from '../../../components/BookContext/useBooks';
import Cookies from "js-cookie";
import { BakeryDining } from "@mui/icons-material";


export function LoadBooks(): ReactElement  {
    const { setShowErrorMessageB } = useBooks();
    const [filter, setFilter] = React.useState('Categorias');
    
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookObj | null>(null);
  const [numberCopies, setNumberCopies] = useState(0);
  console.log(Cookies.get('token'))

  const getABook = async (id: string | undefined) => {
    if(id){
      try{
        const answer = await getBook(id);
        if (answer) {
          const book: BookObj | undefined = answer.data.body && answer.data.body.length === 1 
            ? answer.data.body[0] 
            : undefined;
          if (book) {
            setSelectedBook(book);
            const availableCopies = book.copies.filter((copy: Copy) => copy.disponibility === "AVAILABLE");
            console.log(availableCopies);
            setNumberCopies(availableCopies.length);
            setDialogOpen(true);
          }
        }
      }catch(error){
        setShowErrorMessageB("Error al cargar el libro");
      }
      
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const validateUser = () => {
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    const rol = user ? user.rol : null;
    if(rol == "Bibliotecario"){
      return true;
    }
    return false;
  }
 
    return (
      <Container  maxWidth={false} sx={{ backgroundColor: "white",  width: "100vw", 
        height: "100vh", position: "fixed", overflow: "auto" }}>
      <Container maxWidth="lg" sx={{ py: 4, backgroundColor : "white"}}>
        {validateUser()&&<AdministrationPanel />}
        <AutoStoriesOutlinedIcon color='primary' sx={{ 
          fontSize: 85, 
          display: "block", 
          mx: "auto", 
          my: 2,
         
        }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign:'center', marginBottom: 8}}  color='primary' >Explore la biblioteca</Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{backgroundColor: "white", borderRadius: 3, marginBottom: 7}} fullWidth>
            <InputLabel id="select-label">Filtro</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={filter}
              label="Filtro"
              onChange={handleChange}
              sx={{
                color: '#000',
                border: '10px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
                '& .MuiSelect-icon': {
                  color: '#000',
                }
              }}
            >
              <MenuItem value="Categorias">Categorías</MenuItem>
              <MenuItem value="Subcategorias">Subcategorías</MenuItem>
            </Select>
          </FormControl>
      </Box>
      <LoadCategories type = {filter}  showBook={getABook}/>
      <Book selectedBook={selectedBook} open={dialogOpen} onClose={closeDialog} copies={numberCopies}/>
      </Container>
      </Container>
    );
        
}