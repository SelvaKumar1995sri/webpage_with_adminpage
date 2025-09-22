import { Link } from 'react-router-dom';

const sidebarItems = [
  { label: 'Dashboard', icon: '🏠', path: '/admin_dashboard' },
  { label: 'Products', icon: '📦', path: '/admin_dashboard/products' },
  { label: 'Flash Sales', icon: '⚡', path: '/admin_dashboard/flash-sales' },
  { label: 'Customers', icon: '👥', path: '/admin_dashboard/customers' },
  { label: 'Order List', icon: '📝', path: '/admin_dashboard/orders' },
  { label: 'Report', icon: '📊', path: '/admin_dashboard/report' },
  { label: 'Settings', icon: '⚙️', path: '/admin_dashboard/settings' },  
];

function AdminSidebar({ onLogout }) {
  return (
    <aside style={{ width: 220, background: '#fff', boxShadow: '2px 0 8px #f0f1f2', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 32, color: '#5b6bfa', letterSpacing: 1 }}>Spodut</div>
        <nav>
          {sidebarItems.map(item => (
            <Link key={item.label} to={item.path} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', fontWeight: 500, color: '#222', cursor: 'pointer', borderRadius: 8, transition: 'background 0.2s' }}>
                <span style={{ fontSize: 20, marginRight: 16 }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
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
