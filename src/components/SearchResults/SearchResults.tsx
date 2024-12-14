import React, { useState } from 'react';
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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import UnderConstructionPopup from '../UnderConstructionPopup/UnderConstructionPopup';
import IncompleteSearchPopup from '../IncompleteSearchPopup/IncompleteSearchPopup';
import SearchingPopup from '../SearchingPopup/SearchingPopup';
import NoResultsPopup from '../NoResultsPopup/NoResultsPopup';
import { searchBooks } from '../api/api';
import { getBook } from '../../pages/Hook/BookService';
import BookDetails from '../../pages/BooksModule/Book/index';
import styles from './SearchResults.module.css';
import { Book } from '../api/api';
import { BookObj } from '../../pages/BooksModule/Services/BookObj';

const SearchResults: React.FC = () => {
  const { state } = useLocation();
  const initialResults: Book[] = state?.results || [];
  const allBooks: Book[] = state?.books || [];
  const [showSearchParam, setShowSearchParam] = useState(state?.showSearchParam || '');
  const [results, setResults] = useState<Book[]>(initialResults);
  const [showNoResultsPopup, setShowNoResultsPopup] = useState(false);
  const [showSearchingPopup, setShowSearchingPopup] = useState(false);
  const [showIncompleteSearchPopup, setShowIncompleteSearchPopup] = useState(false);
  const [showUnderConstructionPopup, setShowUnderConstructionPopup] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [searchParam, setSearchParam] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookObj | null>(null);
  const [numberCopies, setNumberCopies] = useState(0);
  const navigate = useNavigate();

  const sortedResults = results.sort((a, b) => {
    const titleA = a.title.trim().charAt(0).toLowerCase();
    const titleB = b.title.trim().charAt(0).toLowerCase();
    return titleA.localeCompare(titleB);
  });

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, bookId: string) => {
    e.preventDefault();
    await getABook(bookId);
  };

  const getABook = async (bookId: string) => {
    if (bookId) {
      try {
        const answer = await getBook(bookId);
        if (answer) {
          const book = answer.data.body && answer.data.body.length === 1
            ? answer.data.body[0]
            : undefined;
          if (book) {
            setSelectedBook(book);
            const availableCopies = book.copies.filter((copy: any) => copy.disponibility === 'AVAILABLE');
            setNumberCopies(availableCopies.length);
            setDialogOpen(true);
          }
        }
      } catch (error) {
        alert('Error al cargar el libro');
      }
    }
  };

  const closeUnderConstructionPopup = () => {
    setShowUnderConstructionPopup(false);
  };

  const closeIncompleteSearchPopup = () => {
    setShowIncompleteSearchPopup(false);
  };

  const closeNoResultsPopup = () => {
    setShowNoResultsPopup(false);
    navigate('/search');
  };

  const handleNewSearch = () => {
    if (!searchType || !searchParam.trim()) {
      setShowIncompleteSearchPopup(true);
      return;
    }
    setShowSearchingPopup(true);
    setTimeout(() => {
      const newResults = searchBooks(allBooks, searchParam, searchType);

      setShowSearchParam(searchParam);
      setShowSearchingPopup(false);
      if (newResults.length > 0) {
        setResults(newResults);
        clearSearchFields();
      } else {
        setShowNoResultsPopup(true);
      }
    }, 3000);
  };

  const clearSearchFields = () => {
    setSearchType('');
    setSearchParam('');
  };

  return (
    <Box
      className={styles.searchResultsContainer}
      sx={{
        p: 3,
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'none',
        color: '#fff',
      }}
    >
      <Typography
        variant="h4"
        className={styles.title}
        sx={{ mb: 4, textAlign: 'center', color: '#fff' }}
      >
        Resultados de Búsqueda para: "{showSearchParam}"
      </Typography>
      <Box className={styles.searchControls} sx={{ display: 'flex', gap: '16px' }}>
        <FormControl sx={{ minWidth: 150, backgroundColor: '#fff' }}>
          <InputLabel>Parámetro</InputLabel>
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            label="Parámetro"
            sx={{ backgroundColor: '#fff' }}
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="title">Título</MenuItem>
            <MenuItem value="author">Autor</MenuItem>
            <MenuItem value="descripcion">Palabras claves</MenuItem>
            <MenuItem value="isbn">ISBN</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Búsqueda"
          variant="outlined"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          sx={{ backgroundColor: '#fff' }}
        />
        <Button
          className={styles.newSearchButton}
          variant="contained"
          onClick={handleNewSearch}
        >
          Nueva Búsqueda
        </Button>
      </Box>
      <Box className={styles.tableContainer} sx={{ mb: 4 }}>
        <TableContainer sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', fontWeight: 'bold' }}>
                  Código
                </TableCell>
                <TableCell sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', fontWeight: 'bold' }}>
                  Título
                </TableCell>
                <TableCell sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', fontWeight: 'bold' }}>
                  Autor
                </TableCell>
                <TableCell sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', fontWeight: 'bold' }}>
                  Descripción
                </TableCell>
                <TableCell sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', fontWeight: 'bold' }}>
                  ISBN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedResults.map((book) => (
                <TableRow key={book.bookId}>
                  <TableCell sx={{ color: '#000', backgroundColor: '#fff' }}>{book.bookId}</TableCell>
                  <TableCell sx={{ color: '#000', backgroundColor: '#fff' }}>
                    <a
                      href="#"
                      onClick={(e) => handleLinkClick(e, book.bookId)}
                      className={styles.titleLink}
                    >
                      {book.title}
                    </a>
                  </TableCell>
                  <TableCell sx={{ color: '#000', backgroundColor: '#fff' }}>{book.author}</TableCell>
                  <TableCell sx={{ color: '#000', backgroundColor: '#fff' }}>{book.descripcion}</TableCell>
                  <TableCell sx={{ color: '#000', backgroundColor: '#fff' }}>{book.isbn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {showUnderConstructionPopup && <UnderConstructionPopup onClose={closeUnderConstructionPopup} />}
      {showIncompleteSearchPopup && <IncompleteSearchPopup onClose={closeIncompleteSearchPopup} />}
      {showSearchingPopup && <SearchingPopup />}
      {showNoResultsPopup && <NoResultsPopup onClose={closeNoResultsPopup} clearFields={clearSearchFields} />}
      {selectedBook && (
        <BookDetails
          selectedBook={selectedBook}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          copies={numberCopies}
        />
      )}
    </Box>
  );
};

export default SearchResults;
