import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_BASE = 'http://localhost:8000/api';

function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', category: '', stock: '', sku: '', price: '', image: '', variants: 1 });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products/${id}/`);
      setForm(res.data);
    } catch (err) {
      setError('Failed to fetch product');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/products/${id}/`, form);
      navigate('/admin_dashboard/products');
    } catch (err) {
      setError('Failed to update product');
    }
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px #f0f1f2', marginBottom: 32, maxWidth: 700, margin: '32px auto' }}>
      <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16 }}>Edit Product</div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" name="category" value={form.category} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input type="number" className="form-control" name="stock" value={form.stock} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">SKU</label>
          <input type="text" className="form-control" name="sku" value={form.sku} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" className="form-control" name="image" value={form.image} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Variants</label>
          <input type="number" className="form-control" name="variants" value={form.variants} onChange={handleChange} min="1" />
        </div>
        <button className="btn btn-primary" type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
