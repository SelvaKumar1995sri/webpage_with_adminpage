import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/login/`, { username, password });
      if (res.status === 200 && res.data && Object.keys(res.data).length > 0 && !res.data.error) {
        setError('');
        localStorage.setItem('admin_logged_in', 'true');
        if (onLogin) onLogin();
        navigate('/admin_dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e0e0e0', color: '#111' }}>
      <div style={{ background: '#fff', padding: '2rem 2.5rem', borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', minWidth: 350 }}>
        <h2 style={{ textAlign: 'center', color: '#111', marginBottom: 24 }}>Admin Login</h2>
        <form onSubmit={handleSubmit} className="p-3" style={{ textAlign: 'center' }}>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label" style={{ color: '#111' }}>Username</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" style={{ background: '#fff', color: '#111' }} value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label" style={{ color: '#111' }}>Password</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" style={{ background: '#fff', color: '#111' }} value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <button className="btn btn-primary w-100" style={{ marginTop: '1rem' }} type="submit">Login</button>
        </form>
        <div className="mt-3" style={{ textAlign: 'center' }}>
          <span>Don't have an account? </span>
          <Link to="/admin-register">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
