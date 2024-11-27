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
import { getBookByCategory, getCategories } from "../../Hook/BookService";
import { BookObj } from "../Services/BookObj";
import { ArrowBack } from "@mui/icons-material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { BookPagination } from "../../../components/BookPagination/BookPagination";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Category } from "../Services/category";

export function LoadBooks(): ReactElement  {
    //const [categories, setCategories] = useState<Category[]>([]);
    const [allCategories, setHashmap] = useState<Record<string, BookObj[]>>({});
    useEffect (() => {
      getAllCategories();
      console.log(allCategories);
    },[]);


    const getAllCategories = async () => {
        const answer = await getCategories();
        if (answer && answer.data && answer.data.body.length > 0){
          if(answer.data.body){
            const categories = answer.data.body;
            for(const item of categories) {
              if(item.categoryId){
                let answerBook = await getBookByCategory(item.categoryId);
                if (answerBook && answerBook.data){
                    let books= answerBook.data.body;
                    console.log(books);
                    if (books.length > 0){
                      setHashmap((prevHashmap) => ({
                        ...prevHashmap,
                        [item.description]: books, 
                      }));
                    }
                }
              }
            }
          }   
        }
    };

    /*const getBooks = async () => {
      if(categories){
        for(const item of categories) {
          if(item.categoryId){
            let answer = await getBookByCategory(item.categoryId);
            if (answer && answer.data){
                let books= answer.data.body;
                setHashmap((prevHashmap) => ({
                  ...prevHashmap,
                  [item.categoryId]: books, 
                }));
            }
          }
        }
      }   
    };*/

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {Object.entries(allCategories).map(([key, value]) => (
          <BookPagination 
            key={key} 
            title={key}
            books={value} 
          />
        ))}
      </Container>
    );
        
}