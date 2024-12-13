import axios, { AxiosResponse } from "axios";
import { BookResponse } from "../BooksModule/Services/BookResponse"


const APISubcategory = "http://localhost:80/SubcategoryModule/";


export const getSubcategories = async () => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.get<BookResponse>(APISubcategory+'getSubcategories');
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`); 
        return answer;
    } catch (error) {
        throw error;
    }
}

export const getBooksBySubcategories = async (idSubcategory: string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.get<BookResponse>(APISubcategory+'getBooks?idSubcategory='+idSubcategory); 
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);         
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
        const answer: AxiosResponse<BookResponse> = await axios.patch<BookResponse>(APISubcategory+'updateSubcategory',requestBody);
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`); 
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
        const answer: AxiosResponse<BookResponse> = await axios.post<BookResponse>(APISubcategory+'createSubcategory',requestBody);
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`); 
        return answer;
        } catch (error) {
        alert(error);
 } 
}


export const getSubcategory = async (subcategory:string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await  axios.get<BookResponse>(APISubcategory+'getSubcategory?id='+subcategory);
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`); 
        return answer;
    } catch (error) {
            alert(error);
    } 
}

export const deleteSubcategory = async (id:string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await  axios.delete<BookResponse>(APISubcategory+'deleteSubcategory?id='+id);
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`); 
        return answer;
    } catch (error) {
            alert(error);
    } 
}
