import React, { ReactElement, useEffect, useState } from "react";
import {
    Typography,
    CardMedia,
    Box,
    Pagination,
    Card,
    CardContent, Chip
  } from '@mui/material';
import { BookObj } from "../../pages/BooksModule/Services/BookObj";
import { Navigate, useNavigate } from "react-router-dom";
import { BookCard } from "../BookCard/BookCard";

const booksPerPage = 5; 
  type Props = {
    title?: string;
    books: BookObj[];
};

export function BookPagination(props: Props): ReactElement {
    const {
        title,
        books
    } = props;

    const [page, setPage] = useState({
      count: 0,
      from: 0,
      to: booksPerPage
    });

    const [Newbooks, setBooks] = useState<BookObj[]>();


    const handlePageChange =  (event: React.ChangeEvent<unknown>, value: number) => {
        const from = (value-1)*booksPerPage;
        const to = (value-1) * booksPerPage +booksPerPage;
        setPage({...page, from: from, to: to});

    };
    const navigate = useNavigate(); 
    const handleBook = (id: string | undefined) => {
      if(id){
        navigate(`/${id}`);
      }
    };

    useEffect(() => {
      setBooks(books.slice(page.from, page.to));
      console.log(Newbooks);
      console.log(books);
      setPage({...page, count: books.length})
    },[page.from, page.to]);
      

return (<Box p={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography variant="h5"  gutterBottom color='primary'>
                {title}
              </Typography>
              <Chip
              label="Ver todo"
              component="a"
              href=""
              variant="outlined"
              clickable
              color="primary"
            />
            </Box>
              <Box display="grid" gridTemplateColumns={{
                  xs: "repeat(auto-fill, minmax(120px, 1fr))",
                  sm: "repeat(auto-fill, minmax(150px, 1fr))",
                  md: "repeat(auto-fill, minmax(200px, 1fr))",
                }}
                gap={1} sx={{paddingTop: 2}} >
                {Newbooks?.map((book, i) => (
                  <BookCard book = {book} key={i}/>
                ))}
            </Box>
            <Pagination
                count={Math.ceil(page.count/booksPerPage)}
                onChange={handlePageChange}
                color="primary"
                sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}
            />
        </Box>);
}