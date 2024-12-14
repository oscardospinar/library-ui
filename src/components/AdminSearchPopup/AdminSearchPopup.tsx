import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getBook } from '../../pages/Hook/BookService';
import SearchingPopup from '../SearchingPopup/SearchingPopup';
import NoResultsPopup from '../NoResultsPopup/NoResultsPopup';
import UnderConstructionPopup from '../UnderConstructionPopup/UnderConstructionPopup';
import IncompleteSearchPopup from '../IncompleteSearchPopup/IncompleteSearchPopup';

interface AdminSearchPopupProps {
  onClose: () => void;
}

const AdminSearchPopup: React.FC<AdminSearchPopupProps> = ({ onClose }) => {
  const [searchOption, setSearchOption] = useState<string>('');
  const [bookId, setBookId] = useState<string>('');
  const [showSearchingPopup, setShowSearchingPopup] = useState<boolean>(false);
  const [showUnderConstructionPopup, setShowUnderConstructionPopup] = useState<boolean>(false);
  const [showNoResultsPopup, setShowNoResultsPopup] = useState<boolean>(false);
  const [showIncompleteSearchPopup, setShowIncompleteSearchPopup] = useState<boolean>(false);
  const [error, setError] = useState<{ searchOption: boolean; bookId: boolean }>({
    searchOption: false,
    bookId: false,
  });

  const navigate = useNavigate();

  const handleSearch = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
  
    // Validación de campos
    const hasErrors = {
      searchOption: !searchOption,
      bookId: !bookId.trim(),
    };
    setError(hasErrors);
  
    if (hasErrors.searchOption || hasErrors.bookId) {
      return;
    }
  
    if (searchOption === 'estado') {
      setShowSearchingPopup(true); // Muestra el popup de búsqueda en curso
  
      setTimeout(async () => {
        try {
          const response = await getBook(bookId);
          const bookData = response.data.body;
  
          setShowSearchingPopup(false); // Oculta el popup de búsqueda en curso
  
          if (bookData) {
            navigate('/admin-results', { state: { bookData } });
          } else {
            setShowNoResultsPopup(true); // Muestra el popup de "Sin resultados"
          }
        } catch (error) {
          setShowSearchingPopup(false); // Oculta el popup de búsqueda en curso
          setShowNoResultsPopup(true); // Muestra el popup de "Sin resultados" si ocurre un error
          console.error('Error al buscar el estado del libro:', error);
        }
      }, 3000); // Temporizador de 3 segundos
    } else if (searchOption=== 'prestamos'){
        setShowUnderConstructionPopup(true);
        return
    }else {
      alert('Tipo de búsqueda no soportado.');
    }
  };

  const clearSearchFields = () => {
    setSearchOption('');
    setBookId('');
  };

  return (
    <Modal open={true} onClose={onClose} aria-labelledby="admin-search-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="admin-search-title" variant="h6" component="h2" mb={2}>
          Búsqueda Administrativa
        </Typography>

        <TextField
          select
          fullWidth
          label="Seleccione el tipo de búsqueda"
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
          SelectProps={{ native: true }}
          error={error.searchOption}
          helperText={error.searchOption ? 'Este campo es obligatorio' : ''}
          sx={{ marginBottom: 2 }}
        >
          <option value="">Seleccione una opción</option>
          <option value="prestamos">Historial de préstamos</option>
          <option value="estado">Estado de un libro</option>
        </TextField>

        <TextField
          fullWidth
          label="ID del libro"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          error={error.bookId}
          helperText={error.bookId ? 'Este campo es obligatorio' : ''}
          sx={{ marginBottom: 2 }}
        />

        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Buscar
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </Box>
        {showUnderConstructionPopup && <UnderConstructionPopup onClose={() => setShowUnderConstructionPopup(false)} />}
        {showIncompleteSearchPopup && <IncompleteSearchPopup onClose={() => setShowIncompleteSearchPopup(false)} />}
        {showSearchingPopup && <SearchingPopup />}
        {showNoResultsPopup && (
          <NoResultsPopup onClose={() => setShowNoResultsPopup(false)} clearFields={clearSearchFields} />
        )}
      </Box>
    </Modal>
  );
};

export default AdminSearchPopup;
