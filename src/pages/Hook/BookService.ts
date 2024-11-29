import axios from "axios";
import { BookObj } from "../BooksModule/Services/BookObj";
import { Category } from "../BooksModule/Services/category";
import { BookResponse } from "../BooksModule/Services/BookResponse"


const API = 'http://localhost:80/BookModule/';
const APICategory = 'http://localhost:80/CategoryModule/';
const APISubcategory = 'http://localhost:80/SubcategoryModule/';


export const getBook = async (idBook:string) => {
    try{
        var answer = axios.get<BookResponse>(API+'getBook?id='+idBook);
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

export const getSubcategories = async () => {
    try{
        var answer = axios.get<BookResponse>(APISubcategory+'getSubcategories');
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const getBooksBySubcategories = async (idSubcategory: string) => {
    try{
        var answer = axios.get<BookResponse>(APISubcategory+'getBooks?idSubcategory='+idSubcategory);        
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
