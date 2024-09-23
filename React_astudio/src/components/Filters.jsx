import React, { useState } from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 5px;
`;

const Input = styled.input`
  padding: 5px;
`;

const Filters = ({ onPageSizeChange, onSearch, onFilterChange, filters, pageSize, page }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterKeyPress = (filter, value, key) => {
    if (key === 'Enter' && value.trim() !== '') {
      // Call the onFilterChange prop with the new filter
      onFilterChange(filter, value);
    }
  };

  const handleFilterInputChange = (filter, value) => {
    // Clear all other filter values and set the current one
    const newFilterValues = {};
    if (value !== '') {
      newFilterValues[filter] = value;
      setActiveFilter(filter);
    } else {
      setActiveFilter(null);
    }
    setFilterValues(newFilterValues);
  };

  return (
    <FiltersContainer>
      <Select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </Select>
      {searchVisible && (
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />
      )}
      <button onClick={() => setSearchVisible(!searchVisible)}>🔍</button>
 
      {page !="products" && filters.map((filter) => (
        <Input
          key={filter}
          type="text"
          placeholder={filter}
          value={filterValues[filter] || ''}
          onChange={(e) => handleFilterInputChange(filter, e.target.value)}
          onKeyPress={(e) => handleFilterKeyPress(filter, e.target.value, e.key)}
          style={{
            borderColor: activeFilter === filter ? 'blue' : 'initial',
            borderWidth: activeFilter === filter ? '2px' : '1px'
          }}
        />
      ))} 
    </FiltersContainer>
  );
};

export default Filters;