import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Users from './pages/Users';
import Products from './pages/Products';
import { AppProvider } from './context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      </Router>
    </AppProvider>
  );
};

export default App;