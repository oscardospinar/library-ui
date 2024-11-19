import React, { ReactElement, useEffect, useState } from "react";
import {
    Typography,
    CardMedia,
    Box,
    Pagination,
    Card,
    CardContent
  } from '@mui/material';
import { BookObj } from "../../pages/BooksModule/Services/BookObj";

const booksPerPage = 3; 
  type Props = {
    title: string;
    books: BookObj[];
};

export function CardInformation(props: Props): ReactElement {
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

    useEffect(() => {
      setBooks(books.slice(page.from, page.to));
      console.log(Newbooks);
      console.log(books);
      setPage({...page, count: books.length})
    },[page.from, page.to]);
      

return (<Box p={3} bgcolor="grey.100">
              <Typography variant="h5" gutterBottom color='primary'>
                {title}
              </Typography>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} gap={2} >
                {Newbooks?.map((book, i) => (
                  <Card key={i}  sx={{ 
                    maxWidth: 345, 
                    cursor: 'pointer', 
                    '&:hover': { 
                      boxShadow: 6,
                      transition: 'box-shadow 0.3s ease-in-out'
                    }, 
                    overflow: 'hidden'
                  }}>
                    <CardMedia
                      component="img"
                      height="350"
                      image={`http://localhost:80/${book.imgPath}`}
                      alt={`Portada de ${book.title}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap', 
                        }}>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {book.author}
                      </Typography>
                      <Typography variant="body2"  sx={{ mt: 1, color: book.copies.length < 3 ? '#ff0000' : 'text.secondary'}}>
                        Ejemplares disponibles: {book.copies.length}
                      </Typography>
                    </CardContent>
                  </Card>
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