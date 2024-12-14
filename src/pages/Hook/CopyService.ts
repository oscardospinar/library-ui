import axios, { AxiosResponse } from "axios";
import { Copy} from "../BooksModule/Services/Copy";
import { BookResponse } from "../BooksModule/Services/BookResponse"

const API = "http://localhost:80/CopyModule/";

export const getAllCopies= async () => {
    try{
        const answer  = await axios.get<BookResponse>(API+'findAll');   
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);        
        return answer;
    } catch (error) {
        throw error;
    }
}

export const getCopy = async (id:string) => {
    try{
        const answer = await axios.get<BookResponse>(API+'getCopy?id='+id);    
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);        
        return answer;
    } catch (error) {
        throw error;
    }
}

export const updateCopy = async (id:string, state: string, ubication: string, availability: string) => {
    try{
        const requestBody = {
            id: id,
            state: state,
            ubication: ubication,
            disponibility: availability
        }
        const answer = await axios.patch<BookResponse>(API+'update', requestBody);   
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);  
        return answer;
    } catch (error) {
        throw error;
    }
}

export const newCopy = async (id:string, state: string, ubication: string) => {
    try{
        const requestBody = {
            state: state,
            ubication: ubication
        }
        const answer = await axios.post<BookResponse>(API+'createCopy?bookId='+id, requestBody);   
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);         
        return answer.data;
    } catch (error) {
        throw error;
    }
}

export const deleteCopy = async (id:string) => {
    try{
        const answer = await axios.delete<BookResponse>(API+'delete?idCopy='+id);    
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);       
        return answer;
    } catch (error) {
        throw error;
    }
}