import axios, { AxiosResponse } from "axios";
import { Copy} from "../BooksModule/Services/Copy";
import { BookResponse } from "../BooksModule/Services/BookResponse"

const API = "http://localhost:80/CopyModule/";

export const getAllCopies= async () => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.get<BookResponse>(API+'findAll');   
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);        
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const getCopy = async (id:string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.get<BookResponse>(API+'getCopy?id='+id);    
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);        
        return answer;
    } catch (error) {
        alert(error);
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
        const answer: AxiosResponse<BookResponse> = await axios.patch<BookResponse>(API+'update', requestBody);   
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);   
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const newCopy = async (id:string, state: string, ubication: string) => {
    try{
        const requestBody = {
            state: state,
            ubication: ubication
        }
        const answer: AxiosResponse<BookResponse> = await axios.post<BookResponse>(API+'createCopy?bookId='+id, requestBody);   
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);        
        return answer;
    } catch (error) {
        alert(error);
    }
}

export const deleteCopy = async (id:string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.delete<BookResponse>(API+'delete?idCopy='+id);    
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);        
        return answer;
    } catch (error) {
        alert(error);
    }
}