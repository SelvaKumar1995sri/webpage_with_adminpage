import { Link } from 'react-router-dom';


const sidebarItems = [
  { label: 'Dashboard', icon: '🏠', path: '/admin_dashboard' },
  { label: 'Products', icon: '📦', path: '/admin_dashboard/products' },
  { label: 'Landing Page', icon: '🌐', path: '/admin_dashboard/landing-page' },
  { label: 'Flash Sales', icon: '⚡', path: '/admin_dashboard/flash-sales' },
  { label: 'Customers', icon: '👥', path: '/admin_dashboard/customers' },
  { label: 'Order List', icon: '📝', path: '/admin_dashboard/orders' },
  { label: 'Report', icon: '📊', path: '/admin_dashboard/report' },
  { label: 'Settings', icon: '⚙️', path: '/admin_dashboard/settings' },
];

import React, { useState } from 'react';

function AdminSidebar({ onLogout }) {
  const [openMenu, setOpenMenu] = useState('');
  const handleMenuClick = (label) => {
    // Toggle open/close for submenu
    setOpenMenu(openMenu === label ? '' : label);
  };
  return (
    <aside style={{ width: 220, background: '#fff', boxShadow: '2px 0 8px #f0f1f2', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <nav>
          {sidebarItems.map(item => (
            <div key={item.label}>
              <Link to={item.path} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', fontWeight: 500, color: '#111', cursor: 'pointer', borderRadius: 8, transition: 'background 0.2s' }}>
                  <span style={{ fontSize: 20, marginRight: 16 }}>{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            </div>
          ))}
        </nav>
      </div>
      <div style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#e74c3c', fontWeight: 500 }} onClick={onLogout}>
          <span style={{ fontSize: 20, marginRight: 12 }}>⏻</span> Log out
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
