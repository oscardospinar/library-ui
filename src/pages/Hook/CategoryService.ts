import axios, { AxiosResponse } from "axios";
import { BookResponse } from "../BooksModule/Services/BookResponse"
import Cookies from "js-cookie";

const APICategory = "https://booksmodule-cxazc8etgtd5cwea.eastus2-01.azurewebsites.net/CategoryModule/";



export const getCategories = async () => {
    try{
        const token = Cookies.get('token');
                const userCookie = Cookies.get('user');
                const user = userCookie ? JSON.parse(userCookie) : null;
                const username = user ? user.nombreUsuario : 'Invitado';
                const rol = user ? user.rol : null;
        const answer = await axios.get<BookResponse>(APICategory+`getCategories?rol=${rol}&nombreUsuario=${username}`,{
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

export const getBookByCategory = async (idCategory: string) => {
    try{
        const token = Cookies.get('token');
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const username = user ? user.nombreUsuario : 'Invitado';
        const rol = user ? user.rol : null;
        const answer = await axios.get<BookResponse>(APICategory+`getBooks?rol=${rol}&nombreUsuario=${username}&idCategory=${idCategory}`,{
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


export const updateCategory = async (id: string, description:string) => {
    try{
        const token = Cookies.get('token');
                const userCookie = Cookies.get('user');
                const user = userCookie ? JSON.parse(userCookie) : null;
                const username = user ? user.nombreUsuario : 'Invitado';
                const rol = user ? user.rol : null;
        const requestBody = {
            categoryId: id,
            description: description
        }
        const answer = await axios.patch<BookResponse>(APICategory+`updateCategory?rol=${rol}&nombreUsuario=${username}`,requestBody,{
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

export const saveCategory = async (description:string) => {
    try{
        const token = Cookies.get('token');
                const userCookie = Cookies.get('user');
                const user = userCookie ? JSON.parse(userCookie) : null;
                const username = user ? user.nombreUsuario : 'Invitado';
                const rol = user ? user.rol : null;
        const requestBody = {
            description: description
        }
        const answer = await axios.post<BookResponse>(APICategory+`createCategory?rol=${rol}&nombreUsuario=${username}`,requestBody,{
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


export const deleteCategory = async (id:string) => {
    try{
        const token = Cookies.get('token');
                const userCookie = Cookies.get('user');
                const user = userCookie ? JSON.parse(userCookie) : null;
                const username = user ? user.nombreUsuario : 'Invitado';
                const rol = user ? user.rol : null;
        const answer = await axios.delete<BookResponse>(APICategory+`deleteCategory?rol=${rol}&nombreUsuario=${username}&id=`+id,{
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


export const getCategory = async (category:string) => {
    try{
        const token = Cookies.get('token');
                const userCookie = Cookies.get('user');
                const user = userCookie ? JSON.parse(userCookie) : null;
                const username = user ? user.nombreUsuario : 'Invitado';
                const rol = user ? user.rol : null;
        const answer = await axios.get<BookResponse>(APICategory+`getCategory?rol=${rol}&nombreUsuario=${username}&id=`+category,{
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