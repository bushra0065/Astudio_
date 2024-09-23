import { useState, useEffect } from 'react';
import axios from 'axios';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const useFetchData = (endpoint, initialParams = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({ ...initialParams, isFilter: false });

  useEffect(() => {
    console.log("Fetching data with params:", params);

    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `https://dummyjson.com/${endpoint}`;
        let queryParams = {};

        // Special case for laptop category
        if (params.category === 'laptops') {
          url = `https://dummyjson.com/products/category/laptops`;
        }
        // If filtering, adjust the URL
        else if (params.isFilter && params.key && params.value) {
          let { key, value } = params;

          // Capitalize the first character of `firstName` or `lastName`
          if (key === 'firstName' || key === 'lastName') {
            value = capitalizeFirstLetter(value);
          }

          url = `https://dummyjson.com/${endpoint}/filter?key=${key}&value=${value}`;
        }
        // Regular case: append limit and skip as query parameters
        else {
          queryParams = { limit: params.limit, skip: params.skip };
        }

        console.log("Final URL:", url);

        const response = await axios.get(url, { params: queryParams });

        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, params]);

  return { data, loading, error, setParams };
};

export default useFetchData;