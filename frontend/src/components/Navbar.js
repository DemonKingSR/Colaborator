import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

function Navbar({ toggleTheme, theme }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleStorageChange = () => {
      const userData = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const NavLinks = ({ isMobile }) => (
    <>
      <li onClick={isMobile ? closeMobileMenu : undefined}>
        <Link to="/" className="nav-link">Home</Link>
      </li>
      {!user ? (
        <>
          <li onClick={isMobile ? closeMobileMenu : undefined}>
            <Link to="/signin" className="nav-link">Sign In</Link>
          </li>
          <li onClick={isMobile ? closeMobileMenu : undefined}>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </li>
        </>
      ) : (
        <>
          <li onClick={isMobile ? closeMobileMenu : undefined}>
            <Link to={user.userType === 'FARMER' ? '/farmer' : '/apartment'} className="nav-link">
              Dashboard
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
          </li>
        </>
      )}
      <li className="theme-toggle-container">
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>🌾 Joint Farming System</Link>
        
        {/* Desktop Menu */}
        <ul className="nav-menu desktop-menu">
          <NavLinks isMobile={false} />
        </ul>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            >
              <motion.ul 
                className="nav-menu mobile-menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mobile-menu-header">
                  <h2>Menu</h2>
                  <button className="close-menu" onClick={closeMobileMenu}>&times;</button>
                </div>
                <NavLinks isMobile={true} />
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
