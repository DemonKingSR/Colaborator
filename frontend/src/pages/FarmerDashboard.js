import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './FarmerDashboard.css';

function FarmerDashboard() {
  const [crops, setCrops] = useState([
    { id: 1, name: 'Tomatoes', quantity: 50, price: 40, emoji: '🍅', status: 'Active' },
    { id: 2, name: 'Potatoes', quantity: 100, price: 30, emoji: '🥔', status: 'Active' },
    { id: 3, name: 'Onions', quantity: 80, price: 35, emoji: '🧅', status: 'Out of Stock' }
  ]);
  const [orders, setOrders] = useState([
    { id: 101, crop: 'Tomatoes', quantity: 10, price: 40, total: 400, buyer: 'Green View Apartments', date: new Date().toLocaleDateString(), status: 'Pending', emoji: '🍅' },
    { id: 102, crop: 'Potatoes', quantity: 20, price: 30, total: 600, buyer: 'Sunrise Complex', date: new Date(Date.now() - 86400000).toLocaleDateString(), status: 'Processing', emoji: '🥔' }
  ]);
  
  const [newCrop, setNewCrop] = useState({ name: '', quantity: '', price: '', emoji: '🌾' });
  const [activeTab, setActiveTab] = useState('inventory');

  const handleAddCrop = (e) => {
    e.preventDefault();
    if (newCrop.name && newCrop.quantity && newCrop.price) {
      setCrops([...crops, { ...newCrop, id: Date.now(), status: 'Active' }]);
      toast.success('Crop added successfully! ✅');
      setNewCrop({ name: '', quantity: '', price: '', emoji: '🌾' });
    } else {
      toast.error('Please fill in all crop details.');
    }
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    toast.success(`Order marked as ${newStatus}!`);
  };

  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Farmer"}');

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="farmer-dashboard">
      <div className="container">
        <div className="welcome-banner">
          <div className="banner-content">
            <div>
              <h1>👨‍🌾 Welcome, {user.name}!</h1>
              <p>Manage your crops and connect with apartment communities</p>
            </div>
            <div className="quick-stats">
              <div className="quick-stat">
                <span className="stat-number">{orders.length}</span>
                <span className="stat-text">Active Orders</span>
              </div>
              <div className="quick-stat">
                <span className="stat-number">₹{totalRevenue.toLocaleString()}</span>
                <span className="stat-text">Revenue</span>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            📦 My Crops
          </button>
          <button 
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📋 Orders
          </button>
          <button 
            className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics
          </button>
        </div>

        {activeTab === 'inventory' && (
          <div className="dashboard-grid">
            <div className="card">
              <h2>🌱 Add Crop Listing</h2>
              <form onSubmit={handleAddCrop} className="form">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Crop Name (e.g., Tomatoes)"
                    value={newCrop.name}
                    onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                    className="input crop-name-input"
                  />
                  <select 
                    className="emoji-select"
                    value={newCrop.emoji}
                    onChange={(e) => setNewCrop({...newCrop, emoji: e.target.value})}
                  >
                    <option value="🌾">🌾</option>
                    <option value="🍅">🍅</option>
                    <option value="🥔">🥔</option>
                    <option value="🧅">🧅</option>
                    <option value="🥕">🥕</option>
                    <option value="🥬">🥬</option>
                    <option value="🍎">🍎</option>
                    <option value="🍌">🍌</option>
                    <option value="🍊">🍊</option>
                  </select>
                </div>
                <input
                  type="number"
                  placeholder="Quantity (kg)"
                  value={newCrop.quantity}
                  onChange={(e) => setNewCrop({...newCrop, quantity: e.target.value})}
                  className="input"
                  min="1"
                />
                <input
                  type="number"
                  placeholder="Price per kg (₹)"
                  value={newCrop.price}
                  onChange={(e) => setNewCrop({...newCrop, price: e.target.value})}
                  className="input"
                  min="1"
                />
                <button type="submit" className="btn-primary">
                  ➕ Add Crop
                </button>
              </form>
            </div>

            <div className="card">
              <h2>📦 Your Crop Listings</h2>
              {crops.length === 0 ? (
                <div className="empty-state">🌾 No crops listed yet. Start by adding your first crop!</div>
              ) : (
                <div className="crop-list">
                  {crops.map(crop => (
                    <div key={crop.id} className="crop-item">
                      <div className="crop-header">
                        <h3>{crop.emoji} {crop.name}</h3>
                        <span className={`status-badge ${crop.status === 'Active' ? 'active' : 'inactive'}`}>
                          {crop.status}
                        </span>
                      </div>
                      <div className="crop-details-grid">
                        <div className="detail-item">
                          <span className="label">Quantity</span>
                          <span className="value">{crop.quantity} kg</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Price</span>
                          <span className="value">₹{crop.price}/kg</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Value</span>
                          <span className="value">₹{(crop.quantity * crop.price).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="crop-actions">
                         <button className="btn-secondary" onClick={() => {
                            setCrops(crops.map(c => c.id === crop.id ? { ...c, status: c.status === 'Active' ? 'Out of Stock' : 'Active' } : c));
                         }}>Toggle Status</button>
                         <button className="btn-danger" onClick={() => {
                            setCrops(crops.filter(c => c.id !== crop.id));
                            toast.success("Crop removed!");
                         }}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <div className="section-header">
              <h2>📋 Incoming Orders</h2>
            </div>
            {orders.length === 0 ? (
              <div className="empty-state-large">
                <span className="empty-icon">📋</span>
                <h3>No orders yet</h3>
                <p>Orders from apartment communities will appear here</p>
              </div>
            ) : (
              <div className="orders-grid">
                {orders.map(order => (
                  <div key={order.id} className="order-card farmer-order">
                    <div className="order-header">
                      <span className="order-emoji">{order.emoji}</span>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <h3>{order.crop}</h3>
                    <div className="order-details">
                      <p>🏢 Buyer: {order.buyer}</p>
                      <p>📊 Quantity: {order.quantity} kg</p>
                      <p>💵 Total: ₹{order.total.toLocaleString()}</p>
                      <p>📅 Ordered: {order.date}</p>
                    </div>
                    <div className="order-actions">
                      {order.status === 'Pending' && (
                        <button className="btn-accept" onClick={() => updateOrderStatus(order.id, 'Processing')}>Accept Order</button>
                      )}
                      {order.status === 'Processing' && (
                        <button className="btn-ship" onClick={() => updateOrderStatus(order.id, 'Shipped')}>Mark Shipped</button>
                      )}
                      {order.status === 'Shipped' && (
                        <button className="btn-deliver" onClick={() => updateOrderStatus(order.id, 'Delivered')}>Mark Delivered</button>
                      )}
                      {order.status === 'Delivered' && (
                        <span className="success-text">✅ Delivered Successfully</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <h2>📊 Performance Analytics</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <div className="analytics-icon">💰</div>
                <div className="analytics-content">
                  <h3>Total Revenue</h3>
                  <p className="analytics-value">₹{totalRevenue.toLocaleString()}</p>
                  <span className="analytics-trend">From {orders.length} orders</span>
                </div>
              </div>
              <div className="analytics-card">
                <div className="analytics-icon">📈</div>
                <div className="analytics-content">
                  <h3>Inventory Value</h3>
                  <p className="analytics-value">
                    ₹{crops.reduce((sum, crop) => sum + (crop.quantity * crop.price), 0).toLocaleString()}
                  </p>
                  <span className="analytics-trend">{crops.length} active listings</span>
                </div>
              </div>
              <div className="analytics-card">
                <div className="analytics-icon">📦</div>
                <div className="analytics-content">
                  <h3>Total Volume Sold</h3>
                  <p className="analytics-value">
                    {orders.reduce((sum, order) => sum + (Number(order.quantity) || 0), 0)} kg
                  </p>
                  <span className="analytics-trend">This month</span>
                </div>
              </div>
              <div className="analytics-card">
                <div className="analytics-icon">🏢</div>
                <div className="analytics-content">
                  <h3>Apartment Clients</h3>
                  <p className="analytics-value">
                    {new Set(orders.map(o => o.buyer)).size}
                  </p>
                  <span className="analytics-trend">Unique communities</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FarmerDashboard;
