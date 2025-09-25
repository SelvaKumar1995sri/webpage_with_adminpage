
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

function AdminLandingPage() {
  const [landing, setLanding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    nav_links: [],
    footer_main: '', // main footer text (row 1)
    footer_columns: ['', ''], // featured/contact (row 2, left/right)
    footer_links: ['', '', ''], // About, Contact, Policies (row 3)
  });
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [catForm, setCatForm] = useState({ name: '', image: '', bg_color: '' });
  const [sectionForm, setSectionForm] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchLanding();
  }, []);

const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    marginBottom: 16,
    };
const labelStyle = {
    color: '#111',
    minWidth: 160,
    textAlign: 'right',
    marginBottom: 0,
    };

  const fetchLanding = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/landing/`);
      const data = res.data.length ? res.data[0] : null;
      setLanding(data);
      if (data && data.data) {
        setForm({
          title: data.data.title || '',
          nav_links: data.data.nav_links || [],
          footer_main: data.data.footer_main || '',
          footer_columns: data.data.footer_columns || ['', ''],
          footer_links: data.data.footer_links || ['', '', ''],
        });
        setCategories(data.data.categories || []);
        setSections(data.data.sections || []);
      }
    } catch (err) {
      setError('Failed to fetch landing page data');
    }
    setLoading(false);
  };

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNavLinksChange = (idx, value) => {
    const links = [...form.nav_links];
    links[idx] = value;
    setForm({ ...form, nav_links: links });
  };
  const addNavLink = () => setForm({ ...form, nav_links: [...form.nav_links, ''] });
  const removeNavLink = idx => setForm({ ...form, nav_links: form.nav_links.filter((_, i) => i !== idx) });

  const handleCatFormChange = e => setCatForm({ ...catForm, [e.target.name]: e.target.value });
  const addCategory = () => {
    setCategories([...categories, { ...catForm }]);
    setCatForm({ name: '', image: '', bg_color: '' });
  };
  const removeCategory = idx => setCategories(categories.filter((_, i) => i !== idx));

  const handleSectionFormChange = e => setSectionForm({ ...sectionForm, [e.target.name]: e.target.value });
  const addSection = () => {
    setSections([...sections, { ...sectionForm, content: sectionForm.content ? JSON.parse(sectionForm.content) : {} }]);
    setSectionForm({ title: '', content: '' });
  };
  const removeSection = idx => setSections(sections.filter((_, i) => i !== idx));

  const handleSave = async e => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        nav_links: form.nav_links,
        footer_main: form.footer_main,
        footer_columns: form.footer_columns,
        footer_links: form.footer_links,
        categories,
        sections,
      };
      if (landing) {
        await axios.put(`${API_BASE}/landing/${landing.id}/`, { data: payload });
      } else {
        await axios.post(`${API_BASE}/landing/`, { data: payload });
      }
      setShowForm(false);
      fetchLanding();
    } catch (err) {
      setError('Failed to save landing page');
    }
  };

  // Consistent input style
  const inputStyle = {
    color: '#222',
    background: '#fff',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    padding: '8px 12px',
    fontSize: 15,
    height: 38,
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    outline: 'none',
    minWidth: 0,
    width: '100%',
    transition: 'border 0.2s',
  };
  const textareaStyle = {
    ...inputStyle,
    minHeight: 38,
    resize: 'vertical',
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px #f0f1f2', margin: 32, minHeight: 400 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 20 }}>Landing Page</div>
        <button
          className="btn btn-primary"
          style={{ background: '#5b6bfa', color: '#fff', fontWeight: 500, fontSize: 15, border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer' }}
          onClick={() => setShowForm(true)}
        >
          {landing ? 'Edit Landing Page' : '+ Create Landing Page'}
        </button>
      </div>
      {error && <div className="alert alert-danger" style={{ color: '#e74c3c' }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : showForm ? (
  <form onSubmit={handleSave} style={{ marginTop: 16, background: '#f7f8fa', padding: 24, borderRadius: 12, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }} autoComplete="off">
          {/* Header Title */}
          <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 18 }}>
            <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginBottom: 0 }}>Header Title</label>
            <input type="text" className="form-control" style={{ ...inputStyle, flex: 1 }} name="title" value={form.title} onChange={handleFormChange} required />
          </div>
          {/* Nav Links */}
          <div className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 18 }}>
            <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginTop: 8 }}>Nav Links</label>
            <div style={{ flex: 1 }}>
              {form.nav_links.map((link, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input type="text" className="form-control" style={{ ...inputStyle, flex: 1 }} value={link} onChange={e => handleNavLinksChange(idx, e.target.value)} />
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeNavLink(idx)}>-</button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary btn-sm" onClick={addNavLink}>+ Add Link</button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 18 }}>
            <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginTop: 8 }}>Categories</label>
            <div style={{ flex: 1 }}>
              {categories.map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                  <input type="text" className="form-control" value={cat.name} readOnly style={{ ...inputStyle, flex: 1 }} />
                  <input type="text" className="form-control" value={cat.image} readOnly style={{ ...inputStyle, flex: 1 }} />
                  <input type="text" className="form-control" value={cat.bg_color} readOnly style={{ ...inputStyle, flex: 1 }} />
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeCategory(idx)}>-</button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input type="text" className="form-control" name="name" value={catForm.name} onChange={handleCatFormChange} placeholder="Name" style={{ ...inputStyle, width: 120 }} />
                <input type="text" className="form-control" name="image" value={catForm.image} onChange={handleCatFormChange} placeholder="Image URL" style={{ ...inputStyle, width: 180 }} />
                <input type="text" className="form-control" name="bg_color" value={catForm.bg_color} onChange={handleCatFormChange} placeholder="BG Color" style={{ ...inputStyle, width: 100 }} />
                <button type="button" className="btn btn-secondary btn-sm" onClick={addCategory}>+ Add</button>
              </div>
            </div>
          </div>
          {/* Sections */}
          <div className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 18 }}>
            <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginTop: 8 }}>Sections (e.g. Trending, Accessories)</label>
            <div style={{ flex: 1 }}>
              {sections.map((sec, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                  <input type="text" className="form-control" value={sec.title} readOnly style={{ ...inputStyle, width: 160 }} />
                  <textarea className="form-control" value={JSON.stringify(sec.content)} readOnly style={{ ...textareaStyle, width: 220, height: 40 }} />
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeSection(idx)}>-</button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input type="text" className="form-control" name="title" value={sectionForm.title} onChange={handleSectionFormChange} placeholder="Section Title" style={{ ...inputStyle, width: 160 }} />
                <input type="text" className="form-control" name="content" value={sectionForm.content} onChange={handleSectionFormChange} placeholder='Content (JSON)' style={{ ...inputStyle, width: 220 }} />
                <button type="button" className="btn btn-secondary btn-sm" onClick={addSection}>+ Add</button>
              </div>
            </div>
          </div>
          {/* Footer Main Text */}
          <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 18 }}>
            <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginBottom: 0 }}>Footer Main Text</label>
            <input type="text" className="form-control" name="footer_main" value={form.footer_main} onChange={handleFormChange} style={{ ...inputStyle, flex: 1 }} placeholder="e.g. Our online store offers..." />
          </div>
          {/* Footer Columns (Featured/Contact) */}
          <div className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 18 }}>
            <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginTop: 8 }}>Footer Columns</label>
            <div style={{ flex: 1, display: 'flex', gap: 16 }}>
              <textarea className="form-control" style={{ ...textareaStyle, flex: 1 }}
                name="footer_columns_0"
                value={form.footer_columns[0]}
                onChange={e => setForm(f => ({ ...f, footer_columns: [e.target.value, f.footer_columns[1]] }))}
                placeholder="Featured Products (markdown or HTML)"
                rows={4}
              />
              <textarea className="form-control" style={{ ...textareaStyle, flex: 1 }}
                name="footer_columns_1"
                value={form.footer_columns[1]}
                onChange={e => setForm(f => ({ ...f, footer_columns: [f.footer_columns[0], e.target.value] }))}
                placeholder="Contact Details (markdown or HTML)"
                rows={4}
              />
            </div>
          </div>
          {/* Footer Links Row */}
          <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 18 }}>
            <label className="form-label" style={{ color: '#111', minWidth: 160, textAlign: 'right', marginBottom: 0 }}>Footer Links</label>
            <div style={{ flex: 1, display: 'flex', gap: 8 }}>
              <input type="text" className="form-control" style={{ ...inputStyle }} name="footer_links_0" value={form.footer_links[0]} onChange={e => setForm(f => ({ ...f, footer_links: [e.target.value, f.footer_links[1], f.footer_links[2]] }))} placeholder="About" />
              <input type="text" className="form-control" style={{ ...inputStyle }} name="footer_links_1" value={form.footer_links[1]} onChange={e => setForm(f => ({ ...f, footer_links: [f.footer_links[0], e.target.value, f.footer_links[2]] }))} placeholder="Contact" />
              <input type="text" className="form-control" style={{ ...inputStyle }} name="footer_links_2" value={form.footer_links[2]} onChange={e => setForm(f => ({ ...f, footer_links: [f.footer_links[0], f.footer_links[1], e.target.value] }))} placeholder="Policies" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" type="submit">Save</button>
            <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      ) : landing && landing.data ? (
        <div>
          <div style={{ fontWeight: 600, fontSize: 18 }}>{landing.data.title}</div>
          <div style={{ color: '#888', marginBottom: 8 }}>
            {landing.data.nav_links && landing.data.nav_links.map((link, idx) => (
              <span key={idx} style={{ marginRight: 16 }}>{link}</span>
            ))}
          </div>
          {/* Categories */}
          <div style={{ margin: '24px 0' }}>
            <div style={{ fontWeight: 500, marginBottom: 8 }}>Categories:</div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {landing.data.categories && landing.data.categories.map((cat, idx) => (
                <div key={idx} style={{ background: cat.bg_color || '#eee', borderRadius: 8, padding: 12, minWidth: 120, textAlign: 'center' }}>
                  <img src={cat.image} alt={cat.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                  <div>{cat.name}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Sections */}
          <div style={{ margin: '24px 0' }}>
            {landing.data.sections && landing.data.sections.map((sec, idx) => (
              <div key={idx} style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}>{sec.title}</div>
                <pre style={{ background: '#f7f8fa', padding: 12, borderRadius: 8, fontSize: 14 }}>{JSON.stringify(sec.content, null, 2)}</pre>
              </div>
            ))}
          </div>
          {/* Footer */}
          <div style={{ marginTop: 32, color: '#888', fontSize: 15 }}>{landing.data.footer_content}</div>
        </div>
      ) : (
        <div style={{ color: '#888', fontSize: 16, textAlign: 'center', margin: 48 }}>There is no landing page.</div>
      )}
    </div>
  );
}

export default AdminLandingPage;
