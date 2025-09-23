
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 60% 40%, #6db3f2 0%, #1e3c72 100%)', color: '#fff' }}>
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: 24,
        padding: '48px 40px 40px 40px',
        minWidth: 370,
        maxWidth: 400,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}>
          <svg width="48" height="48" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
          </svg>
        </div>
        <div style={{ letterSpacing: 3, fontSize: 22, fontWeight: 400, marginBottom: 32, color: '#fff', textAlign: 'center' }}>CUSTOMER LOGIN</div>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid #fff', paddingBottom: 4 }}>
            <span style={{ fontSize: 18, marginRight: 10, color: '#fff' }}>✉️</span>
            <input
              type="text"
              placeholder="Customer ID"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 16,
                flex: 1,
                padding: '8px 0',
              }}
              required
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid #fff', paddingBottom: 4 }}>
            <span style={{ fontSize: 18, marginRight: 10, color: '#fff' }}>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 16,
                flex: 1,
                padding: '8px 0',
              }}
              required
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, fontSize: 14 }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 300 }}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ marginRight: 8 }} />
              Remember me
            </label>
            <span style={{ color: '#fff', opacity: 0.8, cursor: 'pointer', fontSize: 13 }}>Forgot Password?</span>
          </div>
          {error && <div style={{ color: '#ffb3b3', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
          <button type="submit" style={{
            width: '100%',
            background: 'rgba(0,0,40,0.25)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '12px 0',
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 2,
            marginTop: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}>LOGIN</button>
        </form>
        <div style={{ marginTop: 24, textAlign: 'center', color: '#fff', fontSize: 15 }}>
          Don't have an account?{' '}
          <Link to="/admin-register" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 500 }}>Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
