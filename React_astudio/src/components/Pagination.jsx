import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${props => props.active ? '#c0e3e5' : '#fdc936'};
  border: none;
  cursor: pointer;
  border-radius: 3px;
`;

const ArrowButton = styled(PageButton)`
  background-color: #fdc936;
`;

const Ellipsis = styled.span`
  margin: 0 5px;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <ArrowButton 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        ←
      </ArrowButton>
      
      {renderPageNumbers().map((number, index) => 
        number === '...' ? (
          <Ellipsis key={index}>...</Ellipsis>
        ) : (
          <PageButton
            key={index}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </PageButton>
        )
      )}
      
      <ArrowButton 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        →
      </ArrowButton>
    </PaginationContainer>
  );
};

export default Pagination;