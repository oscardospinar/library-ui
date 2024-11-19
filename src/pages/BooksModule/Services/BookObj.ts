import { Copy } from "./Copy";
export type BookObj = {
    bookId?: string;
    copies: Copy[];
    title: string;
    description: string;
    author: string,
    editorial: string,
    edition: string,
    isbn: number,
    imgPath: string,
    year: number,
    category: string,
    subcategories: string[];
}
export {};