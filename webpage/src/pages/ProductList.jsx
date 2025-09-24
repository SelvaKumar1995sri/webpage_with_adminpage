import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8000/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleEdit = (id) => {
    navigate(`/admin_dashboard/products/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}/`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  // Filter and paginate
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const maxPage = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  const handleSearchChange = e => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 0, boxShadow: '0 2px 8px #f0f1f2', marginBottom: 32, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 0 24px' }}>
        <div style={{ fontWeight: 600, fontSize: 18 }}>Product List</div>
        {/* Search box */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={handleSearchChange}
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', minWidth: 220 }}
          />
        </div>
        <button
          className="btn btn-primary"
          style={{ background: '#5b6bfa', color: '#fff', fontWeight: 500, fontSize: 15, border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer' }}
          onClick={() => navigate('/admin_dashboard/products/add')}
        >
          + Add Product
        </button>
      </div>
  <div style={{ padding: 24, paddingTop: 12, maxHeight: '60vh', overflowY: 'auto' }}>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr style={{ background: '#f7f8fa', color: '#888', fontWeight: 600, fontSize: 14 }}>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>ITEM</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>DISCOUNT</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>PRICE</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>STOCK</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>SOLD</th>
                  <th style={{ textAlign: 'left', padding: '12px 8px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((product, idx) => {
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
                        <span style={{ fontSize: 16, marginRight: 4 }}>{product.discount > 0 ? '▲' : '▼'}</span>
                        {Math.abs(c.change)}%
                      </td>
                      <td style={{ padding: '12px 8px' }}>₹{Number(product.price).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 8px', color: '#5b6bfa', fontWeight: 500 }}>{product.stock}</td>
                      <td style={{ padding: '12px 8px', fontWeight: 700, color: '#111' }}>₹{c.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <button className="btn btn-primary btn-sm" onClick={() => handleEdit(product.id)}>Edit</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Pagination controls */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 24, gap: 16 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{ minWidth: 80 }}
              >
                Previous
              </button>
              <span style={{ fontWeight: 500, fontSize: 15 }}>
                Page {page} of {maxPage}
              </span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setPage(p => Math.min(maxPage, p + 1))}
                disabled={page === maxPage}
                style={{ minWidth: 80 }}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
