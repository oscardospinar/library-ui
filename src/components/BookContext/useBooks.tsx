import React, { createContext, useState } from "react";
import ErrorMessage from "../Messages/ErrorMessage";
import SuccessMessage from "../Messages/SuccessMessage";
import WarningMessage from "../Messages/WarningMessage";

type BookContext = {
    setShowErrorMessageB: (open: string) => void;
    setShowSuccessMessageB: (open: string) => void;
    setShowWarningMessageB: (open: string) => void;
};

type Props = {
    children: React.ReactNode
}

const MyContext = createContext<BookContext>({} as BookContext);

export const BookProvider = ({children} : Props) => {
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showWarningMessage, setShowWarningMessage] = useState<boolean>(false);

    
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
            <MyContext.Provider value={{setShowErrorMessageB, setShowSuccessMessageB, setShowWarningMessageB }}>
                {children}
            </MyContext.Provider>
            {showErrorMessage && <ErrorMessage  message={message} onClose={handleCloseMessage} />}
            {showSuccessMessage && <SuccessMessage  message={message} onClose={handleCloseMessageSuccess} />}
            {showWarningMessage && <WarningMessage  message={message} onClose={handleCloseMessagewarning} />}
        </>
    );
};

export const useBooks = () => React.useContext(MyContext);

