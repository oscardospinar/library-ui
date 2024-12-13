import React, { ReactElement, useEffect } from "react";
import { BookPagination } from "../../../components/BookPagination/BookPagination";
import { useBooks } from '../../../components/BookContext/useBooks';

type Props = {
    type: string;
    showBook: (id: string | undefined) => void;
}

export function LoadCategories(props: Props): ReactElement  {
    const { getAllCategories, getAllSubcategories, allBooks } = useBooks();
    const {type, showBook} = props;

    

    useEffect(() => {
        switch (type){
            case "Categorias":
              getAllCategories();
              break;
            case "Subcategorias":
              getAllSubcategories();
              break;
        } 
    }, [type]);
    

    return (
        <>
        {Object.entries(allBooks).map(([key, value]) => (
          <BookPagination 
            key={key} 
            title={key}
            books={value} 
            showBook={showBook}
          />
        ))}
      </>
    );    
}