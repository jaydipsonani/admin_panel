import React from 'react';
import { IconButton } from '@mui/material';
import styles from './customPagination.module.scss'; 


const leftArrowIcon = "/assets/icons/leftArrowIcon.png";
const rightArrowIcon = "/assets/icons/rightArrowIcon.png";


const CustomPagination = ({ count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handlePreviousPage = () => {
    if (page > 0) {
      onPageChange(null, page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      onPageChange(null, page + 1);
    }
  };

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(event);
  };

  const startRow = page * rowsPerPage + 1;
  const endRow = Math.min(count, (page + 1) * rowsPerPage);

  return (
    <>
    <div className={styles.customPagination}>
      <div className={styles.paginationInfo}>
        <span>{startRow}-{endRow} of {count}</span>
      </div>
        <div className={styles.selectMenu}>
        <span>Rows per Pages:</span>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          {[10, 20, 30].map((rowsOption) => (
            <option key={rowsOption} value={rowsOption}>
              {rowsOption}
            </option>
          ))}
        </select>
        </div>
      <div className={styles.paginationControls}>
        <IconButton onClick={handlePreviousPage} disabled={page === 0}>
          <img src={leftArrowIcon} />
        </IconButton>
        <span>{page + 1}/{totalPages}</span>
        <IconButton onClick={handleNextPage} disabled={page >= totalPages - 1}>
          <img src={rightArrowIcon} />
        </IconButton>
      </div>
    </div>
    </>
  );
};

export default CustomPagination;
