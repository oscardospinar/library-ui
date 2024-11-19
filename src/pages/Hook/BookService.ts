import axios from "axios";
import { BookObj } from "../BooksModule/Services/BookObj";


const API = 'http://localhost:80/BookModule/';


export const getBook = async (idBook:string) => {
    try{
        var answer = axios.get<BookObj>(API+'getBook?id='+idBook);
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const getAllBooks = async () => {
    try{
        var answer = axios.get<BookObj[]>(API+'getAllBooks');
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
        var answer = axios.post<BookObj[]>(API+'getBooksByAuthor',message);
        return answer;
    } catch (error) {
        alert(error);
    }
}