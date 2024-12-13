import React, { createContext, useState } from "react";
import { BasicBook } from "../../pages/BooksModule/Services/BasicBook";
import { getBookByCategory, getCategories } from "../../pages/Hook/CategoryService";
import { getSubcategories,getBooksBySubcategories } from "../../pages/Hook/SubcategoryService";
import ErrorMessage from "../Messages/ErrorMessage";
import SuccessMessage from "../Messages/SuccessMessage";
import WarningMessage from "../Messages/WarningMessage";

type BookContext = {
    getAllCategories: () => void;
    getAllSubcategories: () => void;
    allBooks: Record<string, BasicBook[]>;
    setShowErrorMessageB: (open: string) => void;
    setShowSuccessMessageB: (open: string) => void;
    setShowWarningMessageB: (open: string) => void;
};

type Props = {
    children: React.ReactNode
}

const MyContext = createContext<BookContext>({} as BookContext);

export const BookProvider = ({children} : Props) => {
    const [allBooks, setHashmap] = useState<Record<string, BasicBook[]>>({});
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showWarningMessage, setShowWarningMessage] = useState<boolean>(false);
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
            setMessage("Error al cargar las categorías");
            setShowErrorMessage(true);
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
            setMessage("Error al cargar las subcategorías");
            setShowErrorMessage(true);
        }  
    };
    
    const handleCloseMessage = () => {
        setMessage(""); 
        setShowErrorMessage(false);
    };

    const handleCloseMessageSuccess = () => {
      setMessage(""); 
      setShowSuccessMessage(false);
  };

  const handleCloseMessagewarning = () => {
    setMessage(""); 
    setShowWarningMessage(false);
};

const setShowErrorMessageB = (open: string) => {
  setMessage(open); 
  setShowErrorMessage(true);
};
const setShowSuccessMessageB = (open: string) => {
  setMessage(open); 
  setShowSuccessMessage(true);
};
const setShowWarningMessageB = (open: string) => {
  setMessage(open); 
  setShowWarningMessage(true);
};


    return (
        <>
            <MyContext.Provider value={{getAllCategories, getAllSubcategories, allBooks, setShowErrorMessageB, setShowSuccessMessageB, setShowWarningMessageB }}>
                {children}
            </MyContext.Provider>
            {showErrorMessage && <ErrorMessage  message={message} onClose={handleCloseMessage} />}
            {showSuccessMessage && <SuccessMessage  message={message} onClose={handleCloseMessageSuccess} />}
            {showWarningMessage && <WarningMessage  message={message} onClose={handleCloseMessagewarning} />}
        </>
    );
};

export const useBooks = () => React.useContext(MyContext);

