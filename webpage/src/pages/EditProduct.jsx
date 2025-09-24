import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_BASE = 'http://localhost:8000/api';

function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    image: null,
    price: '',
    discount: '',
    stock: '',
    category: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products/${id}/`);
      setForm({
        name: res.data.name || '',
        image: null,
        price: res.data.price || '',
        discount: res.data.discount || '',
        stock: res.data.stock || '',
        category: res.data.category || '',
        description: res.data.description || ''
      });
      if (res.data.image) setPreview(res.data.image.startsWith('http') ? res.data.image : `http://localhost:8000${res.data.image}`);
    } catch (err) {
      setError('Failed to fetch product');
    }
  };

  const handleChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    if (form.image) data.append('image', form.image);
    data.append('price', form.price);
    data.append('discount', form.discount);
    data.append('stock', form.stock);
    data.append('category', form.category);
    data.append('description', form.description);
    try {
      await axios.put(`${API_BASE}/products/${id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/admin_dashboard/products');
    } catch (err) {
      setError('Failed to update product');
    }
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px #f0f1f2', marginBottom: 32, maxWidth: 700, margin: '32px auto', color: '#111' }}>
      <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16, color: '#111', gap: 12 }}>Edit Product</div>
      {error && <div className="alert alert-danger" style={{ color: '#e74c3c' }}>{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
  <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 10 }}>
          <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginBottom: 0 }}>Name</label>
          <input type="text" className="form-control" style={{ color: '#111', background: '#fff', flex: 1 }} name="name" value={form.name} onChange={handleChange} required />
        </div>
  <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 10 }}>
          <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginBottom: 0 }}>Image</label>
          <div style={{ flex: 1 }}>
            <input type="file" className="form-control" name="image" accept="image/*" onChange={handleChange} />
            {preview && <img src={preview} alt="Preview" style={{ marginTop: 10, width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />}
          </div>
        </div>
  <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 10 }}>
          <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginBottom: 0 }}>Price</label>
          <input type="number" className="form-control" style={{ color: '#111', background: '#fff', flex: 1 }} name="price" value={form.price} onChange={handleChange} required />
        </div>
  <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 10 }}>
          <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginBottom: 0 }}>Discount (%)</label>
          <input type="number" step="0.01" min="0" max="100" className="form-control" style={{ color: '#111', background: '#fff', flex: 1 }} name="discount" value={form.discount} onChange={handleChange} />
        </div>
  <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 10 }}>
          <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginBottom: 0 }}>Stock</label>
          <input type="number" className="form-control" style={{ color: '#111', background: '#fff', flex: 1 }} name="stock" value={form.stock} onChange={handleChange} required />
        </div>
  <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 10 }}>
          <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginBottom: 0 }}>Category</label>
          <input type="text" className="form-control" style={{ color: '#111', background: '#fff', flex: 1 }} name="category" value={form.category} onChange={handleChange} required />
        </div>
  <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 10 }}>
          <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginBottom: 0 }}>Description</label>
          <textarea className="form-control" style={{ color: '#111', background: '#fff', flex: 1 }} name="description" value={form.description} onChange={handleChange} rows={2} />
        </div>
        <div style={{ marginTop: 24, gap: 12, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" type="submit">Update Product</button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin_dashboard/products')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
