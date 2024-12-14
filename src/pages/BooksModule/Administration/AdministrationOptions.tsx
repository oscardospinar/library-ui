'use client'
import { ReactElement } from "react";
import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CategoryIcon from '@mui/icons-material/Category';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import LoadAdministration from "./LoadAdministration";


interface Props {
    onClick: (value: string) => void;
    toggleMain: () => void;
    value: string;
  }

export default function AdministrationOptions(props:Props): ReactElement {
    const {onClick, value, toggleMain} = props;
    const sections = [
      { title: 'Libros', description: 'Gestionar libros', key: 'books', icon: <BookIcon fontSize="large" /> },
      { title: 'Categorías', description: 'Gestionar categorías', key: 'categories', icon: <CategoryIcon fontSize="large" /> },
      { title: 'Subcategorías', description: 'Gestionar subcategorías', key: 'subcategories', icon: <SubdirectoryArrowRightIcon fontSize="large" /> },
    ];icon: 
  return (
      value !== "Main" ? (<LoadAdministration value={value} toggleMain={toggleMain}/>) :
      (
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            
        <Grid container spacing={4} justifyContent="center">
          {sections.map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section.title}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {section.icon}
                  </Box>
                  <Typography variant="h5" component="div" gutterBottom align="center">
                    {section.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {section.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button onClick={() => onClick(section.key)} variant="contained" color="primary">
                      Ir a {section.title}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      
  )
  );
}