import * as React from 'react';
import { ReactElement, useState } from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import BookAdministration from './BookAdministration';
import { getAllBooks, getCategories, getSubcategories } from "../../Hook/BookService";
import { Category } from '../Services/category';
import { Subcategory } from '../Services/Subcategory';
import { Copy } from '../Services/Copy';
import CategoryAdministration from './CategoryAdministration';
import SubategoryAdministration from './SubcategoryAdministration';
import { ArrowBack } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { BasicBook } from '../Services/BasicBook';
import LoadAdministration from './LoadAdministration';


interface Props {
    onClick: (value: string) => void;
    toggleMain: () => void;
    value: string;
  }

export default function AdministrationOptions(props:Props): ReactElement {
    const {onClick, value, toggleMain} = props;

    const main = () => (
        <List>
          <ListItemButton onClick={() => onClick('books')}>
            <ListItemText primary="Libros" secondary="Administre los libros de la biblioteca" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => onClick('categories')}>
            <ListItemText
              primary="Categorías"
              secondary="Administre las categorías de la biblioteca"
            />
          </ListItemButton>
          <ListItemButton onClick={() => onClick('subcategories')}>
            <ListItemText
              primary="Subcategorías"
              secondary="Administre las subcategorías de la biblioteca"
            />
          </ListItemButton>
          <ListItemButton onClick={() => onClick('copias')}>
            <ListItemText
              primary="Copias"
              secondary="Administre las copias de la biblioteca"
            />
          </ListItemButton>
        </List>
    );

    const handlePage = () => {
        switch(value){
            case "books":
                return <LoadAdministration title="Gestión de libros" value={value} toggleMain={toggleMain}/>
            case "categories":
                return <LoadAdministration title="Gestión de categorías" value={value} toggleMain={toggleMain}/>
            case "subcategories":
                return <LoadAdministration title="Gestión de subcategorías" value={value} toggleMain={toggleMain}/>
            default:
                return main();
        }
        
    }

  return (
        handlePage()
  );
}