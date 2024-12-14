import axios, { AxiosResponse } from "axios";
import { BookResponse } from "../BooksModule/Services/BookResponse"
import Cookies from "js-cookie";

const API = "https://booksmodule-cxazc8etgtd5cwea.eastus2-01.azurewebsites.net/BookModule/";


export const getBook = async (idBook:string) => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
 
        const answer = await axios.get<BookResponse>(`${API}getBook?rol=${rol}&nombreUsuario=${username}&id=${idBook}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
        return answer;
    } catch (error) {
        throw error;
    }
}
 
export const getAllBooks= async () => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
        const answer = await axios.get<BookResponse>(API+`getAllBooks?rol=${rol}&nombreUsuario=${username}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);      
        return answer;
    } catch (error) {
        throw error;
    }
}
 
 
export const updateBook = async (bookId: string | undefined, isbn: string, description: string, title: string, author: string, collection:string, editorial: string, edition: string,
    recommendedAges: string, language: string, categoryIds?: string[], subcategoryIds?: string[]) => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
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
        const answer = await axios.patch<BookResponse>(API+`updateBook?rol=${rol}&nombreUsuario=${username}`,requestBody,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
        return answer;
        } catch (error) {
            throw error;
    }
}
 
export const saveBook = async (isbn: string, description: string, title: string, author: string, collection:string, editorial: string, edition: string,
    recommendedAges: string, language: string, categoryIds?: string[], subcategoryIds?: string[]) => {
        try{
            const token = Cookies.get('token');
            const userCookie = Cookies.get('user');
            const user = userCookie ? JSON.parse(userCookie) : null;
            const username = user ? user.nombreUsuario : 'Invitado';
            const rol = user ? user.rol : null;
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
            const answer = await axios.post<BookResponse>(API+`saveBook?rol=${rol}&nombreUsuario=${username}`,requestBody,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
            return answer;
            } catch (error) {
                console.log(error);
                throw error;
    }
}
 
export const deleteBook = async (idBook:string) => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
        const answer = await axios.delete<BookResponse>(API+`deleteBook?rol=${rol}&nombreUsuario=${username}&id=`+idBook,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
        return answer;
    } catch (error) {
        throw error;
    }
}
 
 
export const uploadBookImage = async (file: File, bookId: string) => {
    try {
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
      const formData = new FormData();
      formData.append("file", file);
      const answer = await axios.post(API+`uploadImg?rol=${rol}&nombreUsuario=${username}bookId=`+bookId,formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
      return answer.data;
    } catch (error) {
        throw error;
    }
  };
 
export const getCopiesByBook = async (id:string) => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
        const answer = await axios.get<BookResponse>(API+`getCopies?rol=${rol}&nombreUsuario=${username}&bookId=`+id,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
        return answer;
    } catch (error) {
        throw error;
    }
}



