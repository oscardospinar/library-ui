import axios, { AxiosResponse } from "axios";
import { BookResponse } from "../BooksModule/Services/BookResponse"


const API = "http://localhost:80/BookModule/";


export const getBook = async (idBook:string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.get<BookResponse>(`${API}getBook?id=${idBook}`);
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);
        return answer;
    } catch (error) {
        throw error;
    }
}

export const getAllBooks= async () => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.get<BookResponse>(API+'getAllBooks'); 
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);      
        return answer;
    } catch (error) {
        throw error;
    }
}


export const updateBook = async (bookId: string | undefined, isbn: string, description: string, title: string, author: string, collection:string, editorial: string, edition: string,
    recommendedAges: string, language: string, categoryIds?: string[], subcategoryIds?: string[]) => {
    try{
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
        const answer = await axios.patch<BookResponse>(API+'updateBook',requestBody); 
        if(answer.status !== 200) Error(`Error: ${answer.data.message}`);
        return answer;
        } catch (error) {
            throw error;
    } 
}

export const saveBook = async (isbn: string, description: string, title: string, author: string, collection:string, editorial: string, edition: string,
    recommendedAges: string, language: string, categoryIds?: string[], subcategoryIds?: string[]) => {
        try{
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
            const answer = await axios.post<BookResponse>(API+'saveBook',requestBody); 
            if(answer.status !== 200) Error(`Error: ${answer.data.message}`);
            return answer;
            } catch (error) {
                console.log(error);
                throw error;
    } 
}

export const deleteBook = async (idBook:string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.delete<BookResponse>(API+'deleteBook?id='+idBook); 
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);
        return answer;
    } catch (error) {
        throw error;
    }
}


export const uploadBookImage = async (file: File, bookId: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file); 
      const answer: AxiosResponse<BookResponse> = await axios.post(API+'uploadImg?bookId='+bookId,formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); 
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);
      return answer.data; 
    } catch (error) {
        throw error;
    }
  };

export const getCopiesByBook = async (id:string) => {
    try{
        const answer: AxiosResponse<BookResponse> = await axios.get<BookResponse>(API+'getCopies?bookId='+id); 
        if(answer.status !== 200) throw new Error(`Error: ${answer.statusText}`);
        return answer;
    } catch (error) {
        throw error;
    } 
}


