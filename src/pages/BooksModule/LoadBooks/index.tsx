import { ReactElement, useEffect } from "react";
import {
    Typography,
    Box,
    Container,
  } from '@mui/material';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { LoadCategories } from "./LoadCategories";
import * as React from 'react';


export function LoadBooks(): ReactElement  {
    const [filter, setFilter] = React.useState('Categorias');
    
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };
  
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AutoStoriesOutlinedIcon color='primary' sx={{ 
          fontSize: 85, 
          display: "block", 
          mx: "auto", 
          my: 2, 
        }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign:'center'}}  color='primary' >Libros de la biblioteca</Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Filtro</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={filter}
              label="Filtro"
              onChange={handleChange}
            >
              <MenuItem value="Categorias">Categorías</MenuItem>
              <MenuItem value="Subcategorias">Subcategorías</MenuItem>
            </Select>
          </FormControl>
      </Box>
      <LoadCategories type = {filter} />
      </Container>
    );
        
}