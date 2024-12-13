import axios, { AxiosResponse } from "axios";
import { BookResponse } from "../BooksModule/Services/BookResponse"


const APISubcategory = "http://localhost:80/SubcategoryModule/";


export const getSubcategories = async () => {
    try{
        const answer = await axios.get<BookResponse>(APISubcategory+'getSubcategories');
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`); 
        return answer;
    } catch (error) {
        throw error;
    }
}

export const getBooksBySubcategories = async (idSubcategory: string) => {
    try{
        const answer = await axios.get<BookResponse>(APISubcategory+'getBooks?idSubcategory='+idSubcategory); 
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);         
        return answer;
    } catch (error) {
        throw error;
    }
}


export const updateSubcategory = async (id: string, description:string) => {
    try{
        const requestBody = {
            subcategoryId: id,
            description: description
        }
        const answer = await axios.patch<BookResponse>(APISubcategory+'updateSubcategory',requestBody);
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`); 
        return answer;
        } catch (error) {
            throw error;
    } 
}

export const saveSubcategory = async (description:string) => {
    try{
        const requestBody = {
            description: description
        }
        const answer = await axios.post<BookResponse>(APISubcategory+'createSubcategory',requestBody);
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`); 
        return answer;
        } catch (error) {
            throw error;
 } 
}


export const getSubcategory = async (subcategory:string) => {
    try{
        const answer = await axios.get<BookResponse>(APISubcategory+'getSubcategory?id='+subcategory);
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`); 
        return answer;
    } catch (error) {
        throw error;
    } 
}

export const deleteSubcategory = async (id:string) => {
    try{
        const answer = await axios.delete<BookResponse>(APISubcategory+'deleteSubcategory?id='+id);
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`); 
        return answer;
    } catch (error) {
        throw error;
    } 
}
