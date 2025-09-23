

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
const API_BASE = 'http://localhost:8000/api';


function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status (simple check, should use real auth in production)
    const loggedIn = localStorage.getItem('admin_logged_in');
    if (!loggedIn) {
      navigate('/admin');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/products/`);
      setProducts(res.data);
    } catch (err) {
      setError('Failed to fetch products');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/admin');
  };

  // --- Dashboard UI ---
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fa' }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: 32, color: '#111' }}>
        {/* Topbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 22, fontWeight: 600 }}>Report Analysis</div>
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 20, color: '#111' }}>🔔</span>
            <span style={{ fontSize: 20, color: '#111' }}>💬</span>
            <button className="btn btn-outline-danger btn-sm ms-3" onClick={handleLogout}>Logout</button>
          </div> */}
        </div>
        {/* Summary Cards */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
          <SummaryCard title="Total Sales" value="₹34,456.00" change="+14%" positive />
          <SummaryCard title="Total Order" value="3456" change="-17%" />
          <SummaryCard title="Total Revenue" value="₹1,456.00" change="+14%" positive />
          <SummaryCard title="Total Customer" value="42,456" change="-11%" />
        </div>
        {/* Analytics Row */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
          {/* Revenue Chart Placeholder */}
          <div style={{ flex: 2, background: '#fff', borderRadius: 16, padding: 24, minHeight: 220, boxShadow: '0 2px 8px #f0f1f2' }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Revenue</div>
            <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
              [Line Chart Placeholder]
            </div>
          </div>
          {/* Sales by Location Placeholder */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: 24, minHeight: 220, boxShadow: '0 2px 8px #f0f1f2', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontWeight: 600 }}>Sales By Location</div>
            <div style={{ color: '#aaa', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              [Map/Location Placeholder]
            </div>
          </div>
          {/* Total Sales Donut Placeholder */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: 24, minHeight: 220, boxShadow: '0 2px 8px #f0f1f2', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontWeight: 600 }}>Total Sales</div>
            <div style={{ color: '#aaa', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              [Donut Chart Placeholder]
            </div>
          </div>
        </div>
        {/* Top Selling Products Table - Styled as per image */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 0, boxShadow: '0 2px 8px #f0f1f2', marginBottom: 32, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 0 24px' }}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>Top products</div>
            <a href="#" style={{ color: '#5b6bfa', fontWeight: 500, fontSize: 15, textDecoration: 'none' }}>View all</a>
          </div>
          <div style={{ padding: 24, paddingTop: 12 }}>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: '#f7f8fa', color: '#888', fontWeight: 600, fontSize: 14 }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px' }}>ITEM</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px' }}>CHANGE</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px' }}>PRICE</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px' }}>SOLD</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px' }}>SALES</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product, idx) => {
                    // Demo data for change, sold, sales
                    const changes = [
                      { change: -72, sold: 7545, sales: 15302 },
                      { change: 69, sold: 6643, sales: 12492 },
                      { change: -65, sold: 5951, sales: 10351 },
                      { change: -53, sold: 5002, sales: 9917 },
                      { change: 45, sold: 4000, sales: 8000 },
                    ];
                    const c = changes[idx % changes.length];
                    // Fix image URL if needed
                    let imageUrl = product.image;
                    if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
                      imageUrl = `http://localhost:8000${imageUrl}`;
                    }
                    return (
                      <tr key={product.id} style={{ borderBottom: '1px solid #f0f1f2', transition: 'background 0.2s' }}>
                        <td style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 8px' }}>
                          <img src={imageUrl} alt={product.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', background: '#f7f8fa' }} />
                          <span style={{ fontWeight: 500 }}>{product.name}</span>
                        </td>
                        <td style={{ color: c.change > 0 ? '#27ae60' : '#e74c3c', fontWeight: 500, padding: '12px 8px' }}>
                          <span style={{ fontSize: 16, marginRight: 4 }}>{c.change > 0 ? '▲' : '▼'}</span>
                          {Math.abs(c.change)}%
                        </td>
                        <td style={{ padding: '12px 8px' }}>₹{Number(product.price).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 8px', color: '#5b6bfa', fontWeight: 500 }}>{c.sold.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px 8px', fontWeight: 700, color: '#111' }}>₹{c.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* Monthly Target Placeholder */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px #f0f1f2', display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Monthly Target</div>
            <div style={{ color: '#aaa', marginBottom: 8 }}>[Progress Bar Placeholder]</div>
            <div style={{ fontSize: 14, color: '#888' }}>You earn $3267 today, it is higher than last month. Keep up your good trends!</div>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ fontWeight: 600 }}>Target</div>
            <div>₹25k</div>
            <div style={{ fontWeight: 600, marginTop: 8 }}>Revenue</div>
            <div>₹18k</div>
            <div style={{ fontWeight: 600, marginTop: 8 }}>This Month</div>
            <div>₹1.8k</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple summary card component
function SummaryCard({ title, value, change, positive }) {
  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px #f0f1f2', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontWeight: 600, color: '#888', fontSize: 15 }}>{title}</div>
      <div style={{ fontWeight: 700, fontSize: 24 }}>{value}</div>
      <div style={{ color: positive ? '#27ae60' : '#e74c3c', fontWeight: 500, fontSize: 14 }}>{change}</div>
    </div>
  );
}

export default AdminDashboard;
