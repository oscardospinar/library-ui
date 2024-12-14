import React, { ReactElement, ReactNode, useMemo, useState } from "react";
import {
    Box,
    Pagination,
  } from '@mui/material';


const booksPerPage = 10; 
  type Props = {
    books: any[];
    children: (paginatedBooks: any[]) => ReactNode;
};

export function PaginationTable({ books, children }: Props): ReactElement {

  const [page, setPage] = useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
  };
    
    
    const paginatedBooks = useMemo(() => {
      const from = (page - 1) * booksPerPage;
      const to = (page-1) * booksPerPage +booksPerPage;
      return books.slice(from, to);
    }, [books, page]);
      

return (<Box>
           {children(paginatedBooks)}
            <Pagination
                count={Math.ceil(books.length / booksPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
                variant="outlined"
            />
        </Box>);
}