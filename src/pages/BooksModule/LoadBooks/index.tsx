import React, { ReactElement, useEffect, useState } from "react";
import {
    Typography,
    Button,
    CardMedia,
    Chip,
    Box,
    Paper,
    Container,
    Card,
    CardContent
  } from '@mui/material';
import { getCategories } from "../../Hook/BookService";
import { BookObj } from "../Services/BookObj";
import { ArrowBack } from "@mui/icons-material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { BookPagination } from "../../../components/BookPagination/BookPagination";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Category } from "../Services/category";

export function LoadBooks(): ReactElement  {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect (() => {
      getBooks();
    },[]);


    const getBooks = async () => {
        const answer = await getCategories();
        if (answer && answer.data){
          setCategories(answer.data.body);
        }
    };

    const toggleDetalle = () => alert("prueba");

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {categories.map((category) =>
            <BookPagination key={category.categoryId} title={category.description} books={category.books} />
            ) }
        </Container>
      );      
}