import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import FarmerDashboard from './pages/FarmerDashboard';
import ApartmentDashboard from './pages/ApartmentDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Wrapper for page transitions
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Component to handle AnimatePresence accurately based on routes
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/signin" element={<PageWrapper><SignIn /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><SignUp /></PageWrapper>} />
        <Route 
          path="/farmer" 
          element={
            <ProtectedRoute requiredUserType="FARMER">
              <PageWrapper><FarmerDashboard /></PageWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/apartment" 
          element={
            <ProtectedRoute requiredUserType="APARTMENT">
              <PageWrapper><ApartmentDashboard /></PageWrapper>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
      <div className="App">
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#333',
            },
            success: {
              iconTheme: {
                primary: '#4a7c2c',
                secondary: '#fff',
              },
            },
          }}
        />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
