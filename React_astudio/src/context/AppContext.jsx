// context/AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <AppContext.Provider value={{ pageSize, setPageSize }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);