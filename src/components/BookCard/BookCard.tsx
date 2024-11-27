import React, { ReactElement } from "react";
import {
    Typography,
    CardMedia,
    Card,
    CardContent
  } from '@mui/material';
import { BasicBook } from "../../pages/BooksModule/Services/BasicBook";
import { Navigate, useNavigate } from "react-router-dom";
  type Props = {
    book: BasicBook;
};

export function BookCard(props: Props): ReactElement {
    const {
        book
    } = props;

    const navigate = useNavigate(); 
    const handleBook = (id: string | undefined) => {
      if(id){
        navigate(`/${id}`);
      }
    };

return (<>
            <Card sx={{ 
                    maxWidth: 200, 
                    cursor: 'pointer', 
                    '&:hover': { 
                      boxShadow: 6,
                      transition: 'box-shadow 0.3s ease-in-out'
                    }, 
                    overflow: 'hidden',
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={() => handleBook(book?.bookId)} >
            <CardMedia
                      component="img"
                      height="200"
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
                <Typography variant="body2"  color="text.secondary">
                            {book.recommendedAges}
                </Typography>
            </CardContent>
                  </Card>
            </>);
}