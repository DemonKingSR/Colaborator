import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Joint Farming System</h1>
        <p>Connecting Farmers and Communities for Fresh, Sustainable Produce</p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2>🌱 For Farmers</h2>
          <p>Plan cultivation based on real demand</p>
          <p>Eliminate middlemen and get fair prices</p>
          <p>Collaborate with other farmers</p>
          <Link to="/signup" className="btn">Get Started</Link>
        </div>

        <div className="feature-card">
          <h2>🏢 For Apartments</h2>
          <p>Access fresh, chemical-free produce</p>
          <p>Bulk ordering at reasonable costs</p>
          <p>Subscription-based supply models</p>
          <Link to="/signup" className="btn">Get Started</Link>
        </div>
      </section>

      <section className="benefits">
        <h2>Platform Benefits</h2>
        <div className="benefit-grid">
          <div className="benefit-item">
            <h3>📊 Demand Aggregation</h3>
            <p>Match production with consumption</p>
          </div>
          <div className="benefit-item">
            <h3>🚚 Direct Delivery</h3>
            <p>Farm to table with minimal intermediaries</p>
          </div>
          <div className="benefit-item">
            <h3>💰 Fair Pricing</h3>
            <p>Transparent transactions for all</p>
          </div>
          <div className="benefit-item">
            <h3>♻️ Reduce Waste</h3>
            <p>Sustainable and efficient supply chain</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
