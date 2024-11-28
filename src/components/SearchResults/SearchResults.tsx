import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { NavBar } from '../NavBar/NavBar'; // Ajusta la ruta si es necesario

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
}

const SearchResults: React.FC = () => {
  const { state } = useLocation();
  const results: Book[] = state?.results || [];
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2, marginTop: '128px', height: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Resultados de Búsqueda
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ marginBottom: 2 }}
        >
          Nueva Búsqueda
        </Button>   
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Código</strong></TableCell>
                <TableCell><strong>Título</strong></TableCell>
                <TableCell><strong>Autor</strong></TableCell>
                <TableCell><strong>Categoría</strong></TableCell>
                <TableCell><strong>ISBN</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default SearchResults;
