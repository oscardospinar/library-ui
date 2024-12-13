import React, { ReactElement, useEffect, useState } from "react";
import {
    Typography,
    Box,
    Pagination
  } from '@mui/material';

import { BookCard } from "../BookCard/BookCard";
import { BasicBook } from "../../pages/BooksModule/Services/BasicBook";

const booksPerPage = 5; 
  type Props = {
    title?: string;
    books: BasicBook[];
    showBook: (id: string | undefined) => void;
};

export function BookPagination(props: Props): ReactElement {
    const {
        title,
        books,
        showBook
    } = props;

    const [page, setPage] = useState({
      count: 0,
      from: 0,
      to: booksPerPage
    });

    const [Newbooks, setBooks] = useState<BasicBook[]>();


    const handlePageChange =  (event: React.ChangeEvent<unknown>, value: number) => {
        const from = (value-1)*booksPerPage;
        const to = (value-1) * booksPerPage +booksPerPage;
        setPage({...page, from: from, to: to});

    };

    useEffect(() => {
      setBooks(books.slice(page.from, page.to));
      setPage({...page, count: books.length})
    },[page.from, page.to]);
      

return (<Box p={2}>
          <Typography variant="h5"  gutterBottom color='primary'>
              {title}
          </Typography>
          <Box display="grid" gridTemplateColumns={{
                  xs: "repeat(auto-fill, minmax(120px, 1fr))",
                  sm: "repeat(auto-fill, minmax(150px, 1fr))",
                  md: "repeat(auto-fill, minmax(215px, 1fr))",
                }}
                gap={1} sx={{paddingTop: 1}} >
                {Newbooks?.map((book, i) => (
                  <BookCard book = {book} key={i} onClick={showBook}/>
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