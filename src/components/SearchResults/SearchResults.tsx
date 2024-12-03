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
import { searchBooks, getAllBooks } from '../api/api';
import './SearchResults.css';
import { Book } from '../api/api';



const SearchResults: React.FC = () => {
  const { state } = useLocation();
  const initialResults: Book[] = state?.results || [];
  const allBooks: Book[] = state?.books || [];
  const [results, setResults] = useState<Book[]>(initialResults);
  const [showNoResultsPopup, setShowNoResultsPopup] = useState(false);
  const [showSearchingPopup, setShowSearchingPopup] = useState(false);
  const [showIncompleteSearchPopup, setShowIncompleteSearchPopup] = useState(false);
  const [showUnderConstructionPopup, setShowUnderConstructionPopup] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [searchParam, setSearchParam] = useState('');
  const navigate = useNavigate();

  const sortedResults = results.sort((a, b) => {
    const titleA = a.title.trim().charAt(0).toLowerCase();
    const titleB = b.title.trim().charAt(0).toLowerCase();
    return titleA.localeCompare(titleB);
  });


  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowUnderConstructionPopup(true);
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
  }

  const handleNewSearch = () => {
    if (!searchType || !searchParam.trim()) {
      setShowIncompleteSearchPopup(true);
      return;
    }
    setShowSearchingPopup(true);
    setTimeout(() => {
      const newResults = searchBooks(allBooks, searchParam, searchType);
      setShowSearchingPopup(false);
      if (results.length > 0) {
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
    <Box sx={{ padding: 2, marginTop: '128px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, alignItems: 'center', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Resultados de Búsqueda
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Parámetro</InputLabel>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              label="Parámetro"
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
            sx = {{width: '71%'}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewSearch}
          >
            Nueva Búsqueda
          </Button>
        </Box>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Código</strong></TableCell>
                <TableCell><strong>Título</strong></TableCell>
                <TableCell><strong>Autor</strong></TableCell>
                <TableCell><strong>Descripcion</strong></TableCell>
                <TableCell><strong>ISBN</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedResults.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>
                    <a href="#" onClick={handleLinkClick} className="title-link">
                      {book.title}
                    </a>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.descripcion}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {showUnderConstructionPopup && <UnderConstructionPopup onClose={closeUnderConstructionPopup} />}
        {showIncompleteSearchPopup && <IncompleteSearchPopup onClose={closeIncompleteSearchPopup} />}
        {showSearchingPopup && <SearchingPopup />}
        {showNoResultsPopup && <NoResultsPopup onClose={closeNoResultsPopup} clearFields={clearSearchFields} />}
      </Box>
    </Box>
  );
};

export default SearchResults;
