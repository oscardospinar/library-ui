import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import SearchingPopup from '../SearchingPopup/SearchingPopup';
import UnderConstructionPopup from '../UnderConstructionPopup/UnderConstructionPopup';
import NoResultsPopup from '../NoResultsPopup/NoResultsPopup';
import IncompleteSearchPopup from '../IncompleteSearchPopup/IncompleteSearchPopup';
import { getAllBooks, searchBooks, Book } from '../api/api';
import { useNavigate } from 'react-router-dom';
import './SearchCss.css';

const MainSearch: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchParam, setSearchParam] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');
  const [showSearchingPopup, setShowSearchingPopup] = useState<boolean>(false);
  const [showUnderConstructionPopup, setShowUnderConstructionPopup] = useState<boolean>(false);
  const [showNoResultsPopup, setShowNoResultsPopup] = useState<boolean>(false);
  const [showIncompleteSearchPopup, setShowIncompleteSearchPopup] = useState<boolean>(false);
  const [error, setError] = useState<{ searchType: boolean; searchParam: boolean }>({
    searchType: false,
    searchParam: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getAllBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error al cargar los libros:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    const hasErrors = {
      searchType: !searchType,
      searchParam: !searchParam.trim(),
    };
    setError(hasErrors);

    if (hasErrors.searchType || hasErrors.searchParam) {
      setShowIncompleteSearchPopup(true);
      return;
    }

    const normalizedSearchType = searchType.trim().toLowerCase();
    if (['titulo', 'autor', 'description', 'isbn'].includes(normalizedSearchType)) {
      setShowSearchingPopup(true);

      setTimeout(() => {
        const results = searchBooks(books, searchParam, searchType);
        setShowSearchingPopup(false);

        if (results.length > 0) {
          navigate('/results', { state: 
            { results, books }, 
          });
        } else {
          setShowNoResultsPopup(true);
        }
      }, 3000);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('si cambió')
    setSearchType(e.target.value);
    setError((prev) => ({ ...prev, searchType: false }));
  };

  const handleSearchParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
    setError((prev) => ({ ...prev, searchParam: false }));
  };

  const handleIncompleteSearchClose = () => {
    setShowIncompleteSearchPopup(false);
  };

  const handleUnderConstructionClose = () => {
    setShowUnderConstructionPopup(false);
    setSearchType('');
  };

  const clearSearchFields = () => {
    setSearchType('');
    setSearchParam('');
  };

  return (
    <Box sx={{ height: '89vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          padding: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          marginTop: 4,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
          Búsqueda de libros
        </Typography>

        <form onSubmit={handleSearch}>
          <TextField
            select
            fullWidth
            label="Seleccione un parámetro"
            value={searchType}
            onChange={handleSelectChange}
            error={error.searchType}
            helperText={error.searchType ? 'Este campo es obligatorio' : ''}
            SelectProps={{
              native: true,
            }}
            sx={{ marginBottom: 3 }}
          >
            <option value="">Seleccione un parámetro</option>
            <option value="titulo">Título</option>
            <option value="autor">Autor</option>
            <option value="description">Palabras claves</option>
            <option value="isbn">ISBN</option>
          </TextField>

          <TextField
            fullWidth
            label="Ingresa el parámetro de búsqueda"
            value={searchParam}
            onChange={handleSearchParamChange}
            error={error.searchParam}
            helperText={error.searchParam ? 'Este campo es obligatorio' : ''}
            sx={{ marginBottom: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: 1.5 }}
          >
            Buscar
          </Button>
        </form>
        {showUnderConstructionPopup && <UnderConstructionPopup onClose={handleUnderConstructionClose} />}
        {showSearchingPopup && <SearchingPopup />}
        {showNoResultsPopup && (
          <NoResultsPopup onClose={() => setShowNoResultsPopup(false)} clearFields={clearSearchFields} />
        )}
        {showIncompleteSearchPopup && <IncompleteSearchPopup onClose={handleIncompleteSearchClose} />}
      </Box>
    </Box>
  );
};

export default MainSearch;
