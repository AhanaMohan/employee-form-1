import React from 'react';
import { Pagination } from '@mui/material';
interface Props {
  itemsCount: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
function CustomPagination({itemsCount,itemsPerPage,currentPage,setCurrentPage}: Props) {

  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>,value: number) => {
    setCurrentPage(value);
  }; 
  return (
    <>
      {' '}
      <Pagination
        count={pagesCount}
        page={currentPage}
        onChange={handleChangePage}
        shape="rounded"
      />
    </>
  );
}

export default CustomPagination;
