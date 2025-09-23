import React from "react";
import { Link } from "react-router-dom";

function AdminHeader({ handleLogout }) {
  return (
    <div style={{ height: 64, background: '#fff', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', padding: '0 32px', justifyContent: 'space-between' }}>
      <Link to="/admin_dashboard" style={{ fontWeight: 700, fontSize: 24, color: '#5b6bfa', textDecoration: 'none', letterSpacing: 1 }}>
        AquaScape Admin
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* <span style={{ fontSize: 20, color: '#111' }}>🔔</span> */}
        {/* <span style={{ fontSize: 20, color: '#111' }}>💬</span> */}
        <button className="btn btn-outline-danger btn-sm ms-3" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default AdminHeader;
