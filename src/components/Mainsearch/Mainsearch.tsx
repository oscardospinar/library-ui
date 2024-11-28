import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import SearchingPopup from '../SearchingPopup/SearchingPopup';
import UnderConstructionPopup from '../UnderConstructionPopup/UnderConstructionPopup';
import NoResultsPopup from '../NoResultsPopup/NoResultsPopup';
import { getAllBooks, searchBooks, Book } from '../api/api';
import { useNavigate } from 'react-router-dom';
const MainSearch: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchParam, setSearchParam] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');
  const [showSearchingPopup, setShowSearchingPopup] = useState<boolean>(false);
  const [showUnderConstructionPopup, setShowUnderConstructionPopup] = useState<boolean>(false);
  const [showNoResultsPopup, setShowNoResultsPopup] = useState<boolean>(false);
  const navigate = useNavigate();

  // Cargar libros al montar el componente
  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getAllBooks();
      setBooks(fetchedBooks);
      console.log(fetchedBooks);
    };
    fetchBooks();
  }, []);

  const handleSearch = async () => {
    if (searchType === 'code') {
      setShowUnderConstructionPopup(true);
    } else if (['titulo', 'autor', 'descripcion', 'isbn'].includes(searchType)) {
      setShowSearchingPopup(true);

      setTimeout(() => {
        const results = searchBooks(books, searchParam, searchType);
        setShowSearchingPopup(false);

        if (results.length > 0) {
          navigate('/results', { state: { results } });
        } else {
          setShowNoResultsPopup(true);
        }
      }, 3000);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value;
    setSearchType(selectedType);

    if (selectedType === 'code') {
      setShowUnderConstructionPopup(true);
    }
  };

  const handleUnderConstructionClose = () => {
    setShowUnderConstructionPopup(false);
    setSearchType('');
  };

  return (
    <Box sx={{ height: '89hv', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
      {/* Barra de navegación */}

      {/* Caja de búsqueda */}
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

        {/* Selector de parámetros de búsqueda */}
        <TextField
          select
          fullWidth
          label="Seleccione un parámetro"
          value={searchType}
          onChange={handleSelectChange}
          SelectProps={{
            native: true,
          }}
          sx={{ marginBottom: 3 }}
        >
          <option value="">Seleccione un parámetro</option>
          <option value="titulo">Título</option>
          <option value="autor">Autor</option>
          <option value="descripcion">Descripción</option>
          <option value="isbn">ISBN</option>
          <option value="code">Código QR</option>
        </TextField>

        {/* Input de búsqueda */}
        <TextField
          fullWidth
          label="Ingresa el parámetro de búsqueda"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          sx={{ marginBottom: 3 }}
        />

        {/* Botón de búsqueda */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSearch}
          sx={{ padding: 1.5 }}
        >
          Buscar
        </Button>

        {/* Popups */}
        {showSearchingPopup && <SearchingPopup />}
        {showNoResultsPopup && <NoResultsPopup />}
        {showUnderConstructionPopup && (
          <UnderConstructionPopup onClose={handleUnderConstructionClose} />
        )}
      </Box>
    </Box>
  );
};

export default MainSearch;
