import React, { ReactElement, useEffect, useState } from "react";
import { BookObj } from "../Services/BookObj";
import { BookPagination } from "../../../components/BookPagination/BookPagination";
import { getBookByCategory, getCategories, getSubcategories,getBooksBySubcategories } from "../../Hook/BookService";
import { BasicBook } from "../Services/BasicBook";


type Props = {
    type: string;
    showBook: (id: string | undefined) => void;
}

export function LoadCategories(props: Props): ReactElement  {
    const {type, showBook} = props;
    const [allBooks, setHashmap] = useState<Record<string, BasicBook[]>>({});

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
    
    const getAllCategories = async () => {
      setHashmap({});
        const answer = await getCategories();
        if (answer && answer.data && answer.data.body.length > 0){
          if(answer.data.body){
            const categories = answer.data.body;
            for(const item of categories) {
              if(item.categoryId){
                let answerBook = await getBookByCategory(item.categoryId);
                if (answerBook && answerBook.data){
                    let books= answerBook.data.body;
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
    const getAllSubcategories = async () => {
        setHashmap({});
        const answer = await getSubcategories();
        if (answer && answer.data && answer.data.body.length > 0){
          if(answer.data.body){
            const subcategories = answer.data.body;
            for(const item of subcategories) {
              if(item.subcategoryId){
                let answerBook = await getBooksBySubcategories(item.subcategoryId);
                if (answerBook && answerBook.data){
                    let books= answerBook.data.body;
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