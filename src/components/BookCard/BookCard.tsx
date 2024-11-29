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
    onClick: (id: string | undefined) => void;
};

export function BookCard(props: Props): ReactElement {
    const {
        book,
        onClick
    } = props;

    const navigate = useNavigate(); 
    const handleBook = (id: string | undefined) => {
      if(id){
        navigate(`/${id}`);
      }
    };

return (<>
            <Card sx={{ 
                    maxWidth: 218, 
                    cursor: 'pointer', 
                    '&:hover': { 
                      boxShadow: 6,
                      transition: 'box-shadow 0.3s ease-in-out'
                    }, 
                    overflow: 'hidden',
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    padding: 1 
                  }}
                  onClick={() => onClick(book.bookId)} >
            <CardMedia
                      component="img"
                      height="220"
                      image={`http://localhost:80/${book.imgPath}`}
                      alt={`Portada de ${book.title}`}
                    />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{
                  display: '-webkit-box', 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden', 
                  WebkitLineClamp: 2, 
                  textOverflow: 'ellipsis', 
                  fontSize:18
                }}>
                            {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  display: '-webkit-box', 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden', 
                  WebkitLineClamp: 2, 
                  textOverflow: 'ellipsis' 
                }}>
                            {book.author}
                </Typography>
                <Typography variant="body2"  color="text.secondary">
                            {book.recommendedAges}
                </Typography>
            </CardContent>
                  </Card>
            </>);
}