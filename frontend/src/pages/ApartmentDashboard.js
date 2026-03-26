import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './ApartmentDashboard.css';

function ApartmentDashboard() {
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [newOrder, setNewOrder] = useState({ crop: '', quantity: '', deliveryDate: '' });
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const availableCrops = [
    { name: 'Tomatoes', price: 40, emoji: '🍅', category: 'vegetables', farmer: 'Green Valley Farm', rating: 4.5, inStock: true },
    { name: 'Potatoes', price: 30, emoji: '🥔', category: 'vegetables', farmer: 'Sunrise Farms', rating: 4.8, inStock: true },
    { name: 'Onions', price: 35, emoji: '🧅', category: 'vegetables', farmer: 'Fresh Fields', rating: 4.3, inStock: true },
    { name: 'Carrots', price: 45, emoji: '🥕', category: 'vegetables', farmer: 'Organic Roots', rating: 4.7, inStock: true },
    { name: 'Spinach', price: 50, emoji: '🥬', category: 'leafy', farmer: 'Green Valley Farm', rating: 4.6, inStock: true },
    { name: 'Cabbage', price: 25, emoji: '🥬', category: 'leafy', farmer: 'Fresh Fields', rating: 4.4, inStock: false },
    { name: 'Apples', price: 80, emoji: '🍎', category: 'fruits', farmer: 'Orchard Hills', rating: 4.9, inStock: true },
    { name: 'Bananas', price: 50, emoji: '🍌', category: 'fruits', farmer: 'Tropical Farms', rating: 4.5, inStock: true },
    { name: 'Oranges', price: 60, emoji: '🍊', category: 'fruits', farmer: 'Citrus Grove', rating: 4.7, inStock: true }
  ];

  const categories = [
    { id: 'all', name: 'All Products', emoji: '🌾' },
    { id: 'vegetables', name: 'Vegetables', emoji: '🥕' },
    { id: 'fruits', name: 'Fruits', emoji: '🍎' },
    { id: 'leafy', name: 'Leafy Greens', emoji: '🥬' }
  ];



  const handleSubscribe = (cropName) => {
    const crop = availableCrops.find(c => c.name === cropName);
    if (!subscriptions.find(s => s.crop === cropName)) {
      setSubscriptions([...subscriptions, {
        id: Date.now(),
        crop: cropName,
        emoji: crop.emoji,
        frequency: 'Weekly',
        quantity: 5,
        nextDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
      }]);
      toast.success(`Subscribed to ${cropName}! 🔄`);
    } else {
      toast.error('You are already subscribed to this crop.');
    }
  };

  const filteredCrops = selectedCategory === 'all' 
    ? availableCrops 
    : availableCrops.filter(crop => crop.category === selectedCategory);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const totalSavings = Math.round(totalSpent * 0.18);

  return (
    <div className="apartment-dashboard">
      <div className="container">
        <div className="welcome-banner">
          <div className="banner-content">
            <div>
              <h1>🏢 Welcome, {user.name}!</h1>
              <p>Fresh produce delivered to your community</p>
            </div>
            <div className="quick-stats">
              <div className="quick-stat">
                <span className="stat-number">{orders.length}</span>
                <span className="stat-text">Orders</span>
              </div>
              <div className="quick-stat">
                <span className="stat-number">₹{totalSavings}</span>
                <span className="stat-text">Saved</span>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'marketplace' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketplace')}
          >
            🛒 Marketplace
          </button>
          <button 
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 My Orders
          </button>
          <button 
            className={`tab ${activeTab === 'subscriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscriptions')}
          >
            🔄 Subscriptions
          </button>
          <button 
            className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics
          </button>
        </div>

        {activeTab === 'marketplace' && (
          <>
            <div className="category-filter">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>

            <div className="marketplace-grid">
              {filteredCrops.map(crop => (
                <div key={crop.name} className="product-card">
                  <div className="product-header">
                    <span className="product-emoji">{crop.emoji}</span>
                    {!crop.inStock && <span className="out-of-stock">Out of Stock</span>}
                  </div>
                  <h3>{crop.name}</h3>
                  <p className="farmer-name">👨‍🌾 {crop.farmer}</p>
                  <div className="rating">
                    ⭐ {crop.rating} <span className="reviews">(120+ reviews)</span>
                  </div>
                  <div className="price-tag">₹{crop.price}/kg</div>
                  <div className="product-actions">
                    <button 
                      className="btn-add-cart"
                      onClick={() => {
                        const newOrderDetails = { crop: crop.name, quantity: 1, deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] };
                        setNewOrder(newOrderDetails);
                        
                        // Automatically place order for demo purposes if quantity and delivery date are defaulted
                        setOrders([...orders, { 
                          ...newOrderDetails, 
                          id: Date.now(), 
                          price: crop.price,
                          emoji: crop.emoji,
                          farmer: crop.farmer,
                          total: crop.price * 1,
                          status: 'Processing',
                          date: new Date().toLocaleDateString()
                        }]);
                        toast.success('Added to cart! 🛒');
                      }}
                      disabled={!crop.inStock}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="btn-subscribe"
                      onClick={() => handleSubscribe(crop.name)}
                      disabled={!crop.inStock}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <div className="section-header">
              <h2>📦 Order Management</h2>
              <button className="btn-new-order" onClick={() => setActiveTab('marketplace')}>
                + New Order
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="empty-state-large">
                <span className="empty-icon">🛒</span>
                <h3>No orders yet</h3>
                <p>Start ordering fresh produce from local farmers</p>
                <button className="btn-primary" onClick={() => setActiveTab('marketplace')}>
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div className="orders-grid">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-emoji">{order.emoji}</span>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <h3>{order.crop}</h3>
                    <div className="order-details">
                      <p>👨‍🌾 Farmer: {order.farmer}</p>
                      <p>📊 Quantity: {order.quantity} kg</p>
                      <p>💰 Price: ₹{order.price}/kg</p>
                      <p>💵 Total: ₹{order.total.toLocaleString()}</p>
                      <p>📅 Ordered: {order.date}</p>
                      {order.deliveryDate && <p>🚚 Delivery: {order.deliveryDate}</p>}
                    </div>
                    <button className="btn-track">Track Order</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="subscriptions-section">
            <div className="section-header">
              <h2>🔄 Active Subscriptions</h2>
            </div>

            {subscriptions.length === 0 ? (
              <div className="empty-state-large">
                <span className="empty-icon">🔄</span>
                <h3>No active subscriptions</h3>
                <p>Subscribe to get regular deliveries of your favorite produce</p>
                <button className="btn-primary" onClick={() => setActiveTab('marketplace')}>
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="subscriptions-grid">
                {subscriptions.map(sub => (
                  <div key={sub.id} className="subscription-card">
                    <span className="sub-emoji">{sub.emoji}</span>
                    <h3>{sub.crop}</h3>
                    <div className="sub-details">
                      <p>📅 Frequency: {sub.frequency}</p>
                      <p>📦 Quantity: {sub.quantity} kg</p>
                      <p>🚚 Next Delivery: {sub.nextDelivery}</p>
                    </div>
                    <div className="sub-actions">
                      <button className="btn-pause" onClick={() => toast.success(`Paused ${sub.crop} subscription.`)}>Pause</button>
                      <button className="btn-cancel" onClick={() => toast.success(`Cancelled ${sub.crop} subscription.`)}>Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <h2>📊 Community Analytics</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <div className="analytics-icon">📦</div>
                <div className="analytics-content">
                  <h3>Total Orders</h3>
                  <p className="analytics-value">{orders.length}</p>
                  <span className="analytics-trend">+12% this month</span>
                </div>
              </div>

              <div className="analytics-card">
                <div className="analytics-icon">💰</div>
                <div className="analytics-content">
                  <h3>Total Spent</h3>
                  <p className="analytics-value">₹{totalSpent.toLocaleString()}</p>
                  <span className="analytics-trend">₹{Math.round(totalSpent/orders.length || 0)} avg/order</span>
                </div>
              </div>

              <div className="analytics-card">
                <div className="analytics-icon">💚</div>
                <div className="analytics-content">
                  <h3>Total Savings</h3>
                  <p className="analytics-value">₹{totalSavings.toLocaleString()}</p>
                  <span className="analytics-trend">18% vs market price</span>
                </div>
              </div>

              <div className="analytics-card">
                <div className="analytics-icon">🔄</div>
                <div className="analytics-content">
                  <h3>Active Subscriptions</h3>
                  <p className="analytics-value">{subscriptions.length}</p>
                  <span className="analytics-trend">Regular deliveries</span>
                </div>
              </div>

              <div className="analytics-card">
                <div className="analytics-icon">👨‍🌾</div>
                <div className="analytics-content">
                  <h3>Partner Farmers</h3>
                  <p className="analytics-value">6</p>
                  <span className="analytics-trend">Local & verified</span>
                </div>
              </div>

              <div className="analytics-card">
                <div className="analytics-icon">🌱</div>
                <div className="analytics-content">
                  <h3>CO₂ Saved</h3>
                  <p className="analytics-value">{Math.round(orders.length * 2.5)} kg</p>
                  <span className="analytics-trend">By buying local</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApartmentDashboard;
