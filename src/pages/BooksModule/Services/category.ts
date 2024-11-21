import { BookObj } from "./BookObj";

export type Category = {
    categoryId?: string;
    description: string;
    books: BookObj[];
    subcategories: string[];
}
export {};