import axios, { AxiosResponse } from "axios";
import { Copy} from "../BooksModule/Services/Copy";
import { BookResponse } from "../BooksModule/Services/BookResponse"
import Cookies from "js-cookie";

const API = "https://booksmodule-cxazc8etgtd5cwea.eastus2-01.azurewebsites.net/CopyModule/";

export const getAllCopies= async () => {
    try{
        const token = Cookies.get('token');
                        const userCookie = Cookies.get('user');
                        const user = userCookie ? JSON.parse(userCookie) : null;
                        const username = user ? user.nombreUsuario : 'Invitado';
                        const rol = user ? user.rol : null;
        const answer  = await axios.get<BookResponse>(API+`findAll?rol=${rol}&nombreUsuario=${username}`,{
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
 
export const getCopy = async (id:string) => {
    try{
        const token = Cookies.get('token');
                        const userCookie = Cookies.get('user');
                        const user = userCookie ? JSON.parse(userCookie) : null;
                        const username = user ? user.nombreUsuario : 'Invitado';
                        const rol = user ? user.rol : null;
        const answer = await axios.get<BookResponse>(API+`getCopy?rol=${rol}&nombreUsuario=${username}&id='`+id,{
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
 
export const updateCopy = async (id:string, state: string, ubication: string, availability: string) => {
    try{
        const token = Cookies.get('token');
                        const userCookie = Cookies.get('user');
                        const user = userCookie ? JSON.parse(userCookie) : null;
                        const username = user ? user.nombreUsuario : 'Invitado';
                        const rol = user ? user.rol : null;
        const requestBody = {
            id: id,
            state: state,
            ubication: ubication,
            disponibility: availability
        }
        const answer = await axios.patch<BookResponse>(API+`update?rol=${rol}&nombreUsuario=${username}`, requestBody,{
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
 
export const newCopy = async (id:string, state: string, ubication: string) => {
    try{
        const token = Cookies.get('token');
                        const userCookie = Cookies.get('user');
                        const user = userCookie ? JSON.parse(userCookie) : null;
                        const username = user ? user.nombreUsuario : 'Invitado';
                        const rol = user ? user.rol : null;
        const requestBody = {
            state: state,
            ubication: ubication
        }
        const answer = await axios.post<BookResponse>(API+`createCopy?rol=${rol}&nombreUsuario=${username}&bookId=`+id, requestBody,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });  
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);        
        return answer.data;
    } catch (error) {
        throw error;
    }
}
 
export const deleteCopy = async (id:string) => {
    try{
        const token = Cookies.get('token');
                        const userCookie = Cookies.get('user');
                        const user = userCookie ? JSON.parse(userCookie) : null;
                        const username = user ? user.nombreUsuario : 'Invitado';
                        const rol = user ? user.rol : null;
        const answer = await axios.delete<BookResponse>(API+`delete?rol=${rol}&nombreUsuario=${username}&idCopy=`+id,{
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