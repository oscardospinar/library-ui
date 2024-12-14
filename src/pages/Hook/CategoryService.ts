import axios, { AxiosResponse } from "axios";
import { BookResponse } from "../BooksModule/Services/BookResponse"


const APICategory = "http://localhost:80/CategoryModule/";



export const getCategories = async () => {
    try{
        const answer = await axios.get<BookResponse>(APICategory+'getCategories');
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
        return answer;
    } catch (error) {
        throw error;
    }
}

export const getBookByCategory = async (idCategory: string) => {
    try{
        const answer = await axios.get<BookResponse>(APICategory+'getBooks?idCategory='+idCategory);
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);       
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
        const answer = await axios.patch<BookResponse>(APICategory+'updateCategory',requestBody);
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
        return answer;
        } catch (error) {
            throw error;
 } 
}

export const saveCategory = async (description:string) => {
    try{
        const requestBody = {
            description: description
        }
        const answer = await axios.post<BookResponse>(APICategory+'createCategory',requestBody);
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
        return answer;
        } catch (error) {
            throw error;
 } 
}


export const deleteCategory = async (id:string) => {
    try{
        const answer = await axios.delete<BookResponse>(APICategory+'deleteCategory?id='+id);
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
        return answer;
        } catch (error) {
            throw error;
 } 
}


export const getCategory = async (category:string) => {
    try{
        const answer = await axios.get<BookResponse>(APICategory+'getCategory?id='+category);
        if(answer.data.status !== 200) Error(`Error: ${answer.data.message}`);
        return answer;
        } catch (error) {
            throw error;
    } 
}


    