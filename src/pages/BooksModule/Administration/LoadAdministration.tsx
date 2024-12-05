'use client'
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { BasicBook } from '../Services/BasicBook';
import { Category } from '../Services/category';
import { Subcategory } from '../Services/Subcategory';
import { Copy } from '../Services/Copy';
import * as React from 'react';
import BookAdministration from './BookAdministration';
import { getAllBooks, getCategories, getSubcategories } from "../../Hook/BookService";
import CategoryAdministration from './CategoryAdministration';
import SubategoryAdministration from './SubcategoryAdministration';
import { ArrowBack } from '@mui/icons-material';


interface Props {
    title: string;
    value: string;
    toggleMain: () => void;
}

export default function LoadAdministration(props: Props) {
    const [list,setBooks] = useState<BasicBook[] >([]);
    const [listCategory,setCategories] = useState<Category[] >([]);
    const [listSub,setSubcategories] = useState<Subcategory[] >([]);
    const [listCopy,setCopies] = useState<Copy[] >([]);
    const {value, toggleMain, title} = props;
  
    const handlePage = () => {
        switch(value){
            case "books":
                getBooks();
                return  <BookAdministration initialBooks={list}/>
            case "categories":
                getAllCategories();
                return <CategoryAdministration initialCategories={listCategory}/>
            default:
                getAllSubcategories();
                return <SubategoryAdministration initialSubategories={listSub} />
        }
    }
  const getBooks = async () => {
      const answer = await getAllBooks();
      if (answer) {
        if(answer.data){
            setBooks(answer.data.body);
        }
      }
  };

  const getAllCategories = async () => {
    const answer = await getCategories();
    if (answer) {
      if(answer.data){
        setCategories(answer.data.body);
      }
    }
};

const getAllSubcategories = async () => {
    const answer = await getSubcategories();
    if (answer) {
      if(answer.data){
        setSubcategories(answer.data.body);
      }
    }
};


  return (
    <div style={{ padding: '2rem' }}>
    <Button
        startIcon={<ArrowBack />}
        onClick={toggleMain}
        >
        Volver
    </Button> 
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Button color="success" startIcon={<AddCircleIcon />} size="large">
        </Button>
    </Box>
    {handlePage()}
    </div>
  );
}