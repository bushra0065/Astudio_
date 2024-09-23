import React, { useState, useEffect, useMemo } from 'react';
import useFetchData from '../hooks/useFetchData';
import DataTable from '../components/DataTable';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { useAppContext } from '../context/AppContext';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { pageSize, setPageSize } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error, setParams } = useFetchData('users', { limit: pageSize, skip: 0 });

  const columns = ['firstName', 'lastName', 'email', 'age', 'gender', 'username', 'bloodGroup', 'eyeColor'];

  useEffect(() => {
    setParams(prevParams => ({ ...prevParams, limit: pageSize, skip: (currentPage - 1) * pageSize }));
  }, [pageSize, currentPage, setParams]);

  const handleFilterChange = (key, value) => {
    setSearchTerm(value);
    setParams({
      key,
      value,
      limit: pageSize,
      skip: 0,
      isFilter: true,
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setParams(prevParams => ({ ...prevParams, skip: (page - 1) * pageSize }));
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setParams(prevParams => ({ ...prevParams, limit: size, skip: 0 }));
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    if (!data || !data.users) return [];
    return data.users.filter(user => 
      columns.some(column => {
        const value = user[column];
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <h1>Users</h1>
      <Filters
        onPageSizeChange={handlePageSizeChange}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={['firstName', 'lastName', 'email', 'age', 'gender']}
        pageSize={pageSize}
        page = {'users'}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {data && data.users && (
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

export default Users;