import React, { useState } from 'react';
import {
  Typography,
  Chip,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Close, Category } from '@mui/icons-material';
import { BookObj } from '../Services/BookObj';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

interface Props {
  selectedBook: BookObj | null;
  open: boolean;
  onClose: () => void;
  copies: number;
}
  
  export default function Book(props: Props) {
    const {selectedBook,open,onClose, copies} = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    if (!selectedBook) return null;
    
    return (
      <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      scroll="paper"
    >
      {selectedBook && (
        <>
          <DialogTitle sx={{ m: 0, p: 2}}>
            Detalles del Libro
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 2fr' }} gap={3}>
              <Box>
                <img
                  src={`https://booksmodule-cxazc8etgtd5cwea.eastus2-01.azurewebsites.net/${selectedBook.imgPath}`}
                  alt={`Portada de ${selectedBook.title}`}
                  style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}
                />
              </Box>
              <Box>
              <Typography variant="h6">
                    {selectedBook.title}
              </Typography>
              <Chip icon={<BookmarkIcon></BookmarkIcon>} color="primary" variant="outlined" label={selectedBook.recommendedAges} sx={{ ml: 'auto', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    {selectedBook.author}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, textAlign: "justify"}}>
                    {selectedBook.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Editorial:</strong> {selectedBook.editorial}
                  </Typography>
                  <Typography variant="body2"  sx={{ mb: 2 }}>
                    <strong>Edición:</strong> {selectedBook.edition}
                  </Typography>
                  <Typography variant="body2"  sx={{ mb: 2 }}>
                    <strong>Colección:</strong> {selectedBook.collection}
                  </Typography>
                  <Typography variant="body2"  sx={{ mb: 2 }}>
                    <strong>Idioma:</strong> {selectedBook.language}
                  </Typography>
                  <Typography variant="body2"  sx={{ mb: 2 }}>
                    <strong>ISBN:</strong> {selectedBook.isbn}
                  </Typography>
                  <Paper elevation={1}  sx={{ p: 2, mb: 2, backgroundColor: copies === 0 ? '#ff0000' : '#7bb7e0'}}>
                    <Typography variant="h6" color="primary.contrastText" gutterBottom>
                      Disponibilidad
                    </Typography>
                    <Box display="flex" alignItems="center" >
                    <MenuBookIcon sx={{ mr: 1, color: "primary.contrastText"}} />
                      <Typography variant="h5" color = 'primary.contrastText' >
                        {copies} {copies === 1 ? 'copia disponible' : 'copias disponibles'}
                      </Typography>
                    </Box>
                  </Paper>
                  <Box>
                  <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
                    <Category fontSize="small" sx={{ mr: 1 }} /> Categorías:
                  </Typography>
                  {selectedBook.categories.map((category, index) => (
                    <Chip key={index} label={category} sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
                <Box mt={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Subcategorías:
                  </Typography>
                  {selectedBook.subcategories.map((sub, index) => (
                    <Chip key={index} label={sub} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
    );
  }