import React, { ReactElement, useEffect, useState } from "react";
import { BookPagination } from "../../../components/BookPagination/BookPagination";
import { useBooks } from '../../../components/BookContext/useBooks';
import { BasicBook } from "../../../pages/BooksModule/Services/BasicBook";
import { getBookByCategory, getCategories } from "../../../pages/Hook/CategoryService";
import { getSubcategories,getBooksBySubcategories } from "../../../pages/Hook/SubcategoryService";


type Props = {
    type: string;
    showBook: (id: string | undefined) => void;
}

export function LoadCategories(props: Props): ReactElement  {
    const { setShowErrorMessageB } = useBooks();
    const {type, showBook} = props;
    const [allBooks, setHashmap] = useState<Record<string, BasicBook[]>>({});

    const getAllCategories = async () => {
            setHashmap({});
            try{
                const answer = await getCategories();
                if (answer && answer.data && answer.data.body.length > 0){
                if(answer.data.body){
                    const categories = answer.data.body;
                    for(const item of categories) {
                        if(item.categoryId && item.active){
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
            }catch(error){
              setShowErrorMessageB("Error al cargar las categorías "+error);
            }      
        };
        const getAllSubcategories = async () => {
            setHashmap({});
            try{
                const answer = await getSubcategories();
                if (answer && answer.data && answer.data.body.length > 0){
                    if(answer.data.body){
                      const subcategories = answer.data.body;
                      for(const item of subcategories) {
                        if(item.subcategoryId && item.active){
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
            }catch(error){
              setShowErrorMessageB("Error al cargar las subcategorías "+error);
            }  
        };
    

    useEffect(() => {
      console.log("pagina principal");
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