import React, { useState, useEffect, useMemo } from 'react';
import useFetchData from '../hooks/useFetchData';
import DataTable from '../components/DataTable';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { useAppContext } from '../context/AppContext';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { pageSize, setPageSize } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { data, loading, error, setParams } = useFetchData('products', { limit: pageSize, skip: 0 });

  // Define columns for the DataTable
  const columns = ['title', 'brand', 'price', 'category', 'rating'];

  // Update params when pageSize, currentPage, or activeTab changes
  useEffect(() => {
    const params = {
      limit: pageSize,
      skip: (currentPage - 1) * pageSize,
    };

    if (activeTab === 'laptop') {
      params.category = 'laptops';
    }

    setParams(params);
  }, [pageSize, currentPage, activeTab, setParams]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setSearchTerm(value);
    setParams({
      key,
      value,
      limit: pageSize,
      skip: 0,
      isFilter: true,
      ...(activeTab === 'laptop' ? { category: 'laptops' } : {}),
    });
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Memoize filtered data based on search term and active tab
  const filteredData = useMemo(() => {
    if (!data || !data.products) return [];
    return data.products.filter(product => 
      (activeTab === 'all' || (activeTab === 'laptop' && product.category.toLowerCase() === 'laptops')) &&
      columns.some(column => {
        const value = product[column];
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns, activeTab]);

  // Handle search input
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="tabs">
        <button
          onClick={() => handleTabChange('all')}
          className={activeTab === 'all' ? 'active' : ''}
        >
          All Products
        </button>
        <button
          onClick={() => handleTabChange('laptop')}
          className={activeTab === 'laptop' ? 'active' : ''}
        >
          Laptops
        </button>
      </div>
      <Filters
        onPageSizeChange={handlePageSizeChange}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={activeTab === 'all' ? ['title', 'brand', 'category', 'price', 'rating'] : ['title', 'brand', 'price', 'rating']}
        pageSize={pageSize}
        page = {'products'}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {data && data.products && (
            <DataTable
              data={filteredData}
              columns={columns}
            />
          )}
          {data && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(data.total / pageSize)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Products;