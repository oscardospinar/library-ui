import axios, { AxiosResponse } from "axios";
import { BookResponse } from "../BooksModule/Services/BookResponse"
import Cookies from "js-cookie";

const APISubcategory = "https://booksmodule-cxazc8etgtd5cwea.eastus2-01.azurewebsites.net/SubcategoryModule/";


export const getSubcategories = async () => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
        const answer = await axios.get<BookResponse>(APISubcategory+`getSubcategories?rol=${rol}&nombreUsuario=${username}`,{
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
 
export const getBooksBySubcategories = async (idSubcategory: string) => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
        const answer = await axios.get<BookResponse>(APISubcategory+`getBooks?rol=${rol}&nombreUsuario=${username}&idSubcategory=`+idSubcategory,{
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
 
 
export const updateSubcategory = async (id: string, description:string) => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
        const requestBody = {
            subcategoryId: id,
            description: description
        }
        const answer = await axios.patch<BookResponse>(APISubcategory+`updateSubcategory?rol=${rol}&nombreUsuario=${username}`,requestBody,{
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
 
export const saveSubcategory = async (description:string) => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
        const requestBody = {
            description: description
        }
        const answer = await axios.post<BookResponse>(APISubcategory+`createSubcategory?rol=${rol}&nombreUsuario=${username}`,requestBody,{
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
 
 
export const getSubcategory = async (subcategory:string) => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
        const answer = await axios.get<BookResponse>(APISubcategory+`getSubcategory?rol=${rol}&nombreUsuario=${username}&id=`+subcategory,{
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
 
export const deleteSubcategory = async (id:string) => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
        const answer = await axios.delete<BookResponse>(APISubcategory+`deleteSubcategory?rol=${rol}&nombreUsuario=${username}&id=`+id,{
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