import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout({ children, onLogout }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f7f8fa' }}>
      <AdminHeader handleLogout={onLogout} />
      <div style={{ display: 'flex', flex: 1 }}>
        <AdminSidebar onLogout={onLogout} />
        <div style={{ flex: 1, padding: 32, color: '#111' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
