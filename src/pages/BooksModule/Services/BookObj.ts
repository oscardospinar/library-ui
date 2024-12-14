import { Copy } from "./Copy";

export type BookObj = {
    bookId?: string;
    copies: Copy[];
    title: string;
    description: string;
    author: string;
    collection: string;
    editorial: string;
    edition: string;
    recommendedAges: string;
    language: string;
    isbn: string;
    imgPath: string;
    categories: string[];
    subcategories: string[];
    active: boolean;
}
export {};