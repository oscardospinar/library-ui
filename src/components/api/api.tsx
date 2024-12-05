import axios from 'axios';

const API_URL = 'http://localhost:80/BookModule/getAllBooks';


export interface Book {
  descripcion: string;
  titulo: string;
  autor: string;
  isbn: string;
  [key: string]: any; 
}

const cleanJsonData = (data: any): any => {
  const softHyphenRegex = /\u00AD/g;

  const cleanString = (value: any): any => {
    if (typeof value === 'string') {
      return value.replace(softHyphenRegex, ''); 
    }
    return value;
  };

  const cleanObject = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(cleanObject);
    } else if (obj && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, cleanObject(value)])
      );
    }
    return cleanString(obj);
  };

  return cleanObject(data);
};

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get(API_URL);
    let { body } = response.data;

    body = cleanJsonData(body);


    return Array.isArray(body)
      ? body.map((book) => ({
          ...book,
          titulo: book.title,
          autor: book.author,
          descripcion: book.description,
        }))
      : [];
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    return [];
  }
};

export const searchBooks = (books: Book[], searchParam: string, searchType: string): Book[] => {
  if (searchType === 'isbn') {
    const sanitizedSearchParam = searchParam.replace(/-/g, '');
    return books.filter((book) =>
      book.isbn.replace(/-/g, '') === sanitizedSearchParam
    );
  }
  return books.filter((book) =>
    book[searchType]?.toString().toLowerCase().includes(searchParam.toLowerCase()) || ''
  );
};
