import axios from "axios";
import { BookObj } from "../BooksModule/Services/BookObj";
import { Category } from "../BooksModule/Services/category";
import { Subcategory } from "../BooksModule/Services/Subcategory";
import { BookResponse } from "../BooksModule/Services/BookResponse"


//const API = 'https://booksmodule-cxazc8etgtd5cwea.eastus2-01.azurewebsites.net/BookModule/';
//const APICategory = 'https://booksmodule-cxazc8etgtd5cwea.eastus2-01.azurewebsites.net/CategoryModule/';
//const APISubcategory = 'https://booksmodule-cxazc8etgtd5cwea.eastus2-01.azurewebsites.net/SubcategoryModule/';
const API = "http://localhost:80/BookModule/";
const APICategory = "http://localhost:80/CategoryModule/";
const APISubcategory = "http://localhost:80/SubcategoryModule/";

export const getBook = async (idBook:string) => {
    try{
        var answer = axios.get<BookResponse>(API+'getBook?id='+idBook);
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const getAllBooks= async () => {
    try{
        var answer = axios.get<BookResponse>(API+'getAllBooks');        
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
        console.error("Error al obtener las categorías:", error);
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

export const updateCategory = async (category:Category) => {
    try{
        var answer = axios.post<any>(API+'updateCategory',category);
        return answer;
        } catch (error) {
        alert(error);
 } 
}

export const updateSubcategory = async (subcategory:Subcategory) => {
    try{
        var answer = axios.post<any>(API+'updateSubcategory',subcategory);
        return answer;
        } catch (error) {
        alert(error);
 } 
}

export const uploadBookImage = async (file: File, bookId: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file); 
      formData.append("bookId", bookId);
  
      const response = await axios.post(API+'uploadImg', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data; // Ruta de la imagen
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw new Error("No se pudo subir la imagen");
    }
  };


