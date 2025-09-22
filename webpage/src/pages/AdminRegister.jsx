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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#e0e0e0',
      color: '#111',
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem 2.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        minWidth: 350,
      }}>
        <h2 style={{ textAlign: 'center', color: '#111', marginBottom: 24 }}>Admin Register</h2>
        <form onSubmit={handleRegister} className="p-3" style={{ textAlign: 'center' }}>
          <div className="mb-3">
            <label style={{ color: '#111' }}>Username</label>
            <input className="form-control" style={{ background: '#fff', color: '#111' }} value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label style={{ color: '#111' }}>Password</label>
            <input type="password" className="form-control" style={{ background: '#fff', color: '#111' }} value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label style={{ color: '#111' }}>Email</label>
            <input type="email" className="form-control" style={{ background: '#fff', color: '#111' }} value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label style={{ color: '#111' }}>First Name</label>
            <input className="form-control" style={{ background: '#fff', color: '#111' }} value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label style={{ color: '#111' }}>Last Name</label>
            <input className="form-control" style={{ background: '#fff', color: '#111' }} value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">Registration successful! Redirecting to login...</div>}
          <button className="btn btn-primary w-100" style={{ marginTop: '1rem' }} type="submit">
            Register
          </button>
        </form>
        <div className="mt-3" style={{ textAlign: 'center' }}>
          <span>Already have an account? </span>
          <Link to="/admin">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
