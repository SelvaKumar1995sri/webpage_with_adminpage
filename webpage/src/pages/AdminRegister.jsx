import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = 'http://localhost:8000/api';

function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await axios.post(`${API_BASE}/register/`, {
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      });
      if (res.status === 201) {
        setSuccess(true);
        setUsername('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
        setTimeout(() => {
          navigate('/admin'); // Redirect to login page after registration
        }, 1500);
      }
    } catch (err) {
      setError('Registration failed. Try a different username.');
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
        <div style={{ letterSpacing: 3, fontSize: 22, fontWeight: 400, marginBottom: 32, color: '#fff', textAlign: 'center' }}>CUSTOMER REGISTER</div>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid #fff', paddingBottom: 4 }}>
            <span style={{ fontSize: 18, marginRight: 10, color: '#fff' }}>👤</span>
            <input
              type="text"
              placeholder="Username"
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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid #fff', paddingBottom: 4 }}>
            <span style={{ fontSize: 18, marginRight: 10, color: '#fff' }}>✉️</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
            <span style={{ fontSize: 18, marginRight: 10, color: '#fff' }}>📝</span>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 16,
                flex: 1,
                padding: '8px 0',
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid #fff', paddingBottom: 4 }}>
            <span style={{ fontSize: 18, marginRight: 10, color: '#fff' }}>📝</span>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 16,
                flex: 1,
                padding: '8px 0',
              }}
            />
          </div>
          {error && <div style={{ color: '#ffb3b3', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
          {success && <div style={{ color: '#b3ffb3', marginBottom: 12, textAlign: 'center' }}>Registration successful! Redirecting to login...</div>}
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
          }}>REGISTER</button>
        </form>
        <div style={{ marginTop: 24, textAlign: 'center', color: '#fff', fontSize: 15 }}>
          Already have an account?{' '}
          <Link to="/admin" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 500 }}>Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
