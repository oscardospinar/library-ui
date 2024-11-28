import axios from 'axios';
const API_URL = 'http://localhost:80/BookModule/getAllBooks';
// Tipos para los libros
export interface Book {
  descripcion: string;
  titulo: string;
  autor: string;
  isbn: string;
  [key: string]: any; // En caso de que haya más propiedades no definidas explícitamente
}

// Obtener todos los libros desde el endpoint
export const getAllBooks = async (): Promise<Book[]> => {
    try {
      const response = await axios.get(API_URL);
      const { body } = response.data; // Se asume que el cuerpo contiene el arreglo de libros
      return Array.isArray(body)
        ? body.map((book) => ({
            ...book,
            titulo: book.title, // Normalización de datos
            autor: book.author,
            descripcion: book.description,
          }))
        : [];
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      return [];
    }
};

// Filtrar libros localmente por parámetros
export const searchBooks = (books: Book[], param: string, type: string): Book[] => {
  const normalizedParam = param.toLowerCase();
  return books.filter((book) => {
    const value = book[type]?.toString().toLowerCase() || ''; // Obtener el valor del campo y normalizarlo
    return value.includes(normalizedParam);
  });
};
