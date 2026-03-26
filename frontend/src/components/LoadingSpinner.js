import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="leaf leaf1">🌱</div>
        <div className="leaf leaf2">🌱</div>
        <div className="leaf leaf3">🌱</div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
