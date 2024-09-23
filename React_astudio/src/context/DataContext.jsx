import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint, params) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/${endpoint}`, { params });
      console.log(response, "response")
      setData(response.data);
    } catch (err) {
      console.log("error", err)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);