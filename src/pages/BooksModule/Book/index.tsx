import React, { ReactElement, useEffect, useState } from "react";
import {
    Typography,
    Button,
    CardMedia,
    Chip,
    Box,
    Paper,
    Container
  } from '@mui/material';
import { getBook, getBooksByAuthor } from "../../Hook/BookService";
import { BookObj } from "../Services/BookObj";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookEditor from "./bookEditor";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { ArrowBack, Language, CollectionsBookmark, Category } from '@mui/icons-material';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function Book(): ReactElement  {
    const [book, setBook] = useState<BookObj>();
    const [numberCopies, setNumberCopies] = useState(0);
    const [books, setBooks] = useState<BookObj[]>([]);
    const { id } = useParams<{ id: string }>();

    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

    useEffect (() => {
      getABook();
    },[id]);

    const getABook = async () => {
      if(id){
        const answer = await getBook(id);
        if (answer){
            setBook(answer.data.body[0]);
            setNumberCopies(answer.data.body[0].copies.length);
        }
      }
    };


    const toggleDetalle = () => alert("prueba");

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {book ? (
            <Container>
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
                    <Chip icon={<BookmarkIcon></BookmarkIcon>} color="primary" variant="outlined" label={book.recommendedAges} sx={{ ml: 'auto', mb: 2 }} />
                  </Box>
                  <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold'}}>
                    {book.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {book.author}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, textAlign: "justify"}}>
                    {book.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Editorial:</strong> {book.editorial}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Edición:</strong> {book.edition}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Colección:</strong> {book.collection}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Idioma:</strong> {book.language}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>ISBN:</strong> {book.isbn}
                  </Typography>
                  <Paper elevation={1}  sx={{ p: 2, mb: 2, backgroundColor: numberCopies === 0 ? '#ff0000' : '#7bb7e0'}}>
                    <Typography variant="h6" color="primary.contrastText" gutterBottom>
                      Disponibilidad
                    </Typography>
                    <Box display="flex" alignItems="center" >
                    <MenuBookIcon sx={{ mr: 1, color: "primary.contrastText"}} />
                      <Typography variant="h5" color = 'primary.contrastText' >
                        {numberCopies} {numberCopies === 1 ? 'copia disponible' : 'copias disponibles'}
                      </Typography>
                    </Box>
                  </Paper>
                  <Box>
                  <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
                    <Category fontSize="small" sx={{ mr: 1 }} /> Categorías:
                  </Typography>
                  {book.categories.map((category, index) => (
                    <Chip key={index} label={category} sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
                <Box mt={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Subcategorías:
                  </Typography>
                  {book.subcategories.map((sub, index) => (
                    <Chip key={index} label={sub} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
                </Box>
              </Box>
              <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Informacion adicional</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    <BookEditor book={book} />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
              </Paper>
              </Container>
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