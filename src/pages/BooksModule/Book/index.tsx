import React, { ReactElement, useEffect, useState } from "react";
import {
    Typography,
    Button,
    CardMedia,
    Chip,
    Box,
    Paper,
    Container,
    Card,
    CardContent
  } from '@mui/material';
import { getBook, getBooksByAuthor } from "../Services/BookService";
import { BookObj } from "../Services/BookObj";
import { ArrowBack } from "@mui/icons-material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { CardInformation } from "../Card";
import BookmarkIcon from '@mui/icons-material/Bookmark';

export function Book(): ReactElement  {
    const [book, setBook] = useState<BookObj>();
    const [numberCopies, setNumberCopies] = useState(0);
    const [books, setBooks] = useState<BookObj[]>([]);
    useEffect (() => {
      getABook();
      getBooks();
    },[]);

    const getABook = async () => {
        const answer = await getBook("6e0ed44b-b7e1-4f52-b8b0-278f76080d81");
        if (answer){
            setBook(answer.data);
            setNumberCopies(answer.data.copies.length);
        }
    };

    const getBooks = async () => {
      if (book && book.bookId){
        console.log(book);
        const answer = await getBooksByAuthor(book.bookId, book.author);
        if (answer && answer.data){
          console.log(answer.data);
            setBooks(answer.data);
        }
      }
    };

    const toggleDetalle = () => alert("prueba");

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {book ? (
              <Paper elevation={3}>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 2fr' }} gap={2}>
                <Box>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={`http://localhost:80/${book.imgPath}`}
                    alt={`Portada de ${book.title}`}
                    sx={{ objectFit: 'cover' }}
                  />
                </Box>
                <Box p={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center'  }}>
                  <Button
                    startIcon={<ArrowBack />}
                    onClick={toggleDetalle}
                    sx={{ mb: 2 }}
                    >
                    Volver
                  </Button>
                    <Chip icon={<BookmarkIcon></BookmarkIcon>} color="primary" variant="outlined" label={"Edición "+book.edition} sx={{ ml: 'auto', mb: 2 }} />
                  </Box>
                  <Typography variant="overline" display="block" sx={{ mb: 1, color: '#0b98d5'}}>
                    {book.category}
                  </Typography>
                  <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#2b355d', fontWeight: 'bold'}}>
                    {book.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {book.author}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {book.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Editorial:</strong> {book.editorial}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Año de publicación:</strong> {book.year}
                  </Typography>
                  <Paper elevation={1}  sx={{ p: 2, mb: 2, backgroundColor: numberCopies < 3 ? '#ff0000' : '#7bb7e0'}}>
                    <Typography variant="h6" color="primary.contrastText" gutterBottom>
                      Disponibilidad
                    </Typography>
                    <Box display="flex" alignItems="center" >
                    <MenuBookIcon sx={{ mr: 1, color: "primary.contrastText"}} />
                      <Typography variant="h5" color = 'primary.contrastText' >
                        {numberCopies} {numberCopies === 1 ? 'ejemplar disponible' : 'ejemplares disponibles'}
                      </Typography>
                    </Box>
                  </Paper>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Subcategorías:
                    </Typography>
                    {book.subcategories.map((sub, index) => (
                      <Chip key={index} label={sub} sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Box>
              </Box>
              <CardInformation title="Otros libros del autor" books={books} />
              </Paper>
          ) : (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" color="error">
                Book Not Found
              </Typography>
            </Box>
          )}
        </Container>
      );      
}