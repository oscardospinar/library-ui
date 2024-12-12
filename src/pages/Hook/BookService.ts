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

export const updateBook = async (bookId: string | undefined, isbn: string, description: string, title: string, author: string, collection:string, editorial: string, edition: string,
    recommendedAges: string, language: string, categoryIds?: string[], subcategoryIds?: string[]) => {
        try{
            const requestBody = {
                bookId: bookId,
                isbn: isbn,
                description: description,
                title: title,
                author: author,
                collection: collection,
                editorial: editorial,
                edition: edition,
                recommendedAges: recommendedAges,
                language: language,
                categoryIds: categoryIds,
                subcategoryIds: subcategoryIds
            }
            var answer = axios.patch<BookResponse>(API+'updateBook',requestBody
            );
            return answer;
            } catch (error) {
            alert(error);
    } 
}

export const saveBook = async (isbn: string, description: string, title: string, author: string, collection:string, editorial: string, edition: string,
    recommendedAges: string, language: string, categoryIds?: string[], subcategoryIds?: string[]) => {
        try{
            const requestBody = {
                isbn: isbn,
                description: description,
                title: title,
                author: author,
                collection: collection,
                editorial: editorial,
                edition: edition,
                recommendedAges: recommendedAges,
                language: language,
                categoryIds: categoryIds,
                subcategoryIds: subcategoryIds
            }
            var answer = axios.post<BookResponse>(API+'saveBook',requestBody);
            return answer;
            } catch (error) {
            alert(error);
    } 
}

export const deleteBook = async (idBook:string) => {
    try{
        var answer = axios.delete<BookResponse>(API+'deleteBook?id='+idBook);
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const updateCategory = async (id: string, description:string) => {
    try{
        const requestBody = {
            categoryId: id,
            description: description
        }
        var answer = axios.patch<BookResponse>(APICategory+'updateCategory',requestBody);
        return answer;
        } catch (error) {
        alert(error);
 } 
}

export const saveCategory = async (description:string) => {
    try{
        const requestBody = {
            description: description
        }
        var answer = axios.post<BookResponse>(APICategory+'createCategory',requestBody);
        return answer;
        } catch (error) {
        alert(error);
 } 
}


export const deleteCategory = async (id:string) => {
    try{
        var answer = axios.delete<BookResponse>(APICategory+'deleteCategory?id='+id);
        return answer;
        } catch (error) {
        alert(error);
 } 
}

export const updateSubcategory = async (id: string, description:string) => {
    try{
        const requestBody = {
            subcategoryId: id,
            description: description
        }
        var answer = axios.patch<BookResponse>(APISubcategory+'updateSubcategory',requestBody);
        return answer;
        } catch (error) {
        alert(error);
    } 
}

export const saveSubcategory = async (description:string) => {
    try{
        const requestBody = {
            description: description
        }
        var answer = axios.post<BookResponse>(APISubcategory+'createSubcategory',requestBody);
        return answer;
        } catch (error) {
        alert(error);
 } 
}

export const uploadBookImage = async (file: File, bookId: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file); 
      const response = await axios.post(API+'uploadImg?bookId='+bookId,formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data; 
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw new Error("No se pudo subir la imagen");
    }
  };

    export const getCategory = async (category:string) => {
        try{
            var answer = axios.get<BookResponse>(APICategory+'getCategory?id='+category);
            return answer;
            } catch (error) {
            alert(error);
    } 
    }

    export const getSubcategory = async (subcategory:string) => {
        try{
            var answer = axios.get<BookResponse>(APISubcategory+'getSubcategory?id='+subcategory);
            return answer;
            } catch (error) {
            alert(error);
    } 
    }

    export const deleteSubcategory = async (id:string) => {
        try{
            var answer = axios.delete<BookResponse>(APISubcategory+'deleteSubcategory?id='+id);
            return answer;
            } catch (error) {
            alert(error);
     } 
    }


