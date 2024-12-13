import axios, { AxiosResponse } from "axios";
import { BookResponse } from "../BooksModule/Services/BookResponse"
import { handleError } from "../BooksModule/Error/ErrorHandler";

const APICategory = "http://localhost:80/CategoryModule/";



export const getCategories = async () => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.get<BookResponse>(APICategory+'getCategories');
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);
        return answer;
    } catch (error) {
        throw error;
    }
}

export const getBookByCategory = async (idCategory: string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.get<BookResponse>(APICategory+'getBooks?idCategory='+idCategory);
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);       
        return answer;
    } catch (error) {
        throw error;
    }
}


export const updateCategory = async (id: string, description:string) => {
    try{
        const requestBody = {
            categoryId: id,
            description: description
        }
        const answer: AxiosResponse<BookResponse> = await axios.patch<BookResponse>(APICategory+'updateCategory',requestBody);
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);
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
        const answer: AxiosResponse<BookResponse> = await axios.post<BookResponse>(APICategory+'createCategory',requestBody);
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);
        return answer;
        } catch (error) {
        alert(error);
 } 
}


export const deleteCategory = async (id:string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.delete<BookResponse>(APICategory+'deleteCategory?id='+id);
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);
        return answer;
        } catch (error) {
        alert(error);
 } 
}


export const getCategory = async (category:string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.get<BookResponse>(APICategory+'getCategory?id='+category);
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);
        return answer;
        } catch (error) {
            alert(error);
    } 
}


    