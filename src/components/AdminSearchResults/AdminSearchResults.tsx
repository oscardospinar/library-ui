import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
} from '@mui/material';
import styles from './AdminSearchResults.module.css';

const AdminSearchResults: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Accede correctamente al arreglo de copias
  const copies = state?.bookData?.[0]?.copies || [];

  const handleBackClick = () => {
    navigate(-1); // Navega hacia atrás
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
        Detalles de las Copias del Libro: {state?.bookData?.[0]?.title} - {state?.bookData?.[0]?.author}
      </Typography>
      <Box className={styles.tableContainer} sx={{ mb: 4 }}>
        <TableContainer sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  ID de la Copia
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  Estado
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  Disponibilidad
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {copies.length > 0 ? (
                copies.map((copy: any) => (
                  <TableRow key={copy.id}>
                    <TableCell sx={{ color: '#000', backgroundColor: '#fff' }}>{copy.id}</TableCell>
                    <TableCell sx={{ color: '#000', backgroundColor: '#fff' }}>{copy.state}</TableCell>
                    <TableCell sx={{ color: '#000', backgroundColor: '#fff' }}>{copy.disponibility}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="center"
                    sx={{ py: 2, backgroundColor: '#fff', color: '#000' }}
                  >
                    No se encontraron copias.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackClick}
          sx={{ px: 4, py: 1 }}
        >
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default AdminSearchResults;
