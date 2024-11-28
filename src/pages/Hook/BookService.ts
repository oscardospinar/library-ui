import axios from "axios";
import { BookObj } from "../BooksModule/Services/BookObj";
import { Category } from "../BooksModule/Services/category";
import { BookResponse } from "../BooksModule/Services/BookResponse"


const API = 'https://booksmodule-cxazc8etgtd5cwea.eastus2-01.azurewebsites.net/BookModule/';
const APICategory = 'https://booksmodule-cxazc8etgtd5cwea.eastus2-01.azurewebsites.net/CategoryModule/';


export const getBook = async (idBook:string) => {
    try{
        var answer = axios.get<BookResponse>(API+'getBook?id='+idBook);
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const getAllBooks = async () => {
    try{
        var answer = axios.get<BookResponse>(API+'getAllBooks');
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const getBooksByAuthor = async (idBook:string, author: string) => {
    try{
        var message = {
            "bookId": idBook,
            "author": author
        }
        var answer = axios.post<BookResponse>(API+'getBooksByAuthor',message);
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const getCategories = async () => {
    try{
        var answer = axios.get<BookResponse>(APICategory+'getCategories');
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const getBookByCategory = async (idCategory: string) => {
    try{
        var answer = axios.get<BookResponse>(APICategory+'getBooks?idCategory='+idCategory);        
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const updateBook = async (book:BookObj) => {
    try{
        var answer = axios.post<any>(API+'updateBook',book);
        return answer;
        } catch (error) {
        alert(error);
 } 
}
