import * as React from 'react';
import { ReactElement } from "react";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import LoadAdministration from './LoadAdministration';


interface Props {
    onClick: (value: string) => void;
    toggleMain: () => void;
    value: string;
  }

export default function AdministrationOptions(props:Props): ReactElement {
    const {onClick, value, toggleMain} = props;
  return (
      value !== "Main" ? (<LoadAdministration value={value} toggleMain={toggleMain}/>) :
      (<List>
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
    </List>)
  );
}