import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import SearchingPopup from '../SearchingPopup/SearchingPopup';
import UnderConstructionPopup from '../UnderConstructionPopup/UnderConstructionPopup';
import NoResultsPopup from '../NoResultsPopup/NoResultsPopup';
import IncompleteSearchPopup from '../IncompleteSearchPopup/IncompleteSearchPopup';
import AdminSearchPopup from '../AdminSearchPopup/AdminSearchPopup';
import { getAllBooks, searchBooks, Book } from '../api/api';
import { useNavigate } from 'react-router-dom';
import styles from './SearchCss.module.css';

const MainSearch: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchParam, setSearchParam] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');
  const [showSearchingPopup, setShowSearchingPopup] = useState<boolean>(false);
  const [showUnderConstructionPopup, setShowUnderConstructionPopup] = useState<boolean>(false);
  const [showNoResultsPopup, setShowNoResultsPopup] = useState<boolean>(false);
  const [showIncompleteSearchPopup, setShowIncompleteSearchPopup] = useState<boolean>(false);
  const [showAdminSearchPopup, setShowAdminSearchPopup] = useState<boolean>(false);
  const [error, setError] = useState<{ searchType: boolean; searchParam: boolean }>({
    searchType: false,
    searchParam: false,
  });
  
  const navigate = useNavigate();

  const token = Cookies.get('token');
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  const username = user ? user.nombreUsuario : 'Invitado';
  const rol = user ? user.rol : null;

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
          const showSearchParam = searchParam;
          navigate('/results', { state: { results, books , showSearchParam} });
        } else {
          setShowNoResultsPopup(true);
        }
      }, 3000);
    }
  };

  const clearSearchFields = () => {
    setSearchType('');
    setSearchParam('');
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.formWrapper}>
        <Typography variant="h4" className={styles.title}>
          Búsqueda de libros
        </Typography>

        <form onSubmit={handleSearch}>
          <TextField
            select
            fullWidth
            label="Seleccione un parámetro"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
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
            onChange={(e) => setSearchParam(e.target.value)}
            error={error.searchParam}
            helperText={error.searchParam ? 'Este campo es obligatorio' : ''}
            sx={{ marginBottom: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            className={styles.searchButton}
          >
            Buscar
          </Button>

          {rol === 'Bibliotecario' && (
            <Button
              variant="outlined"
              className={styles.adminSearchButton}
              onClick={() => setShowAdminSearchPopup(true)}
              sx={{ marginLeft: 2 }}
            >
              Búsqueda Administrativa
            </Button>
          )}
        </form>

        {showUnderConstructionPopup && <UnderConstructionPopup onClose={() => setShowUnderConstructionPopup(false)} />}
        {showSearchingPopup && <SearchingPopup />}
        {showNoResultsPopup && (
          <NoResultsPopup onClose={() => setShowNoResultsPopup(false)} clearFields={clearSearchFields} />
        )}
        {showIncompleteSearchPopup && <IncompleteSearchPopup onClose={() => setShowIncompleteSearchPopup(false)} />}
        {showAdminSearchPopup && (
          <AdminSearchPopup onClose={() => setShowAdminSearchPopup(false)} />
        )}
      </Box>
    </Box>
  );
};

export default MainSearch;
