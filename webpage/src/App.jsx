import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import AdminLayout from "./components/AdminLayout";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import { Box } from "@mui/material";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import FlashSales from "./pages/FlashSales";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Report from "./pages/Report";
import Settings from "./pages/Settings";

function App() {
  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    window.location.href = '/admin';
  };
  return (
    <CartProvider>
      <Router>
        <Box sx={{ width: "100vw", Height: "70vh", overflowX: "hidden", background: 'radial-gradient(circle at 60% 40%, #6db3f2 0%, #1e3c72 100%)' }}>
          {/* Only show Navbar on customer pages */}
          {!(window.location.pathname.startsWith('/admin_dashboard') || window.location.pathname.startsWith('/admin')) && <Navbar />}
          <Box
            component="main"
            sx={{
              width: "100vw",
              flex: 1,
              minHeight: 'calc(100vh - 128px)', // adjust for navbar/footer
              borderRadius: 2,
              backgroundColor: '#fcfdfdff',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account/*" element={<Account />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin_dashboard" element={
                <AdminLayout onLogout={handleLogout}>
                  <AdminDashboard />
                </AdminLayout>
              } />
              <Route path="/admin_dashboard/products" element={
                <AdminLayout onLogout={handleLogout}>
                  <ProductList />
                </AdminLayout>
              } />
              <Route path="/admin_dashboard/products/add" element={
                <AdminLayout onLogout={handleLogout}>
                  <AddProduct />
                </AdminLayout>
              } />
              <Route path="/admin_dashboard/products/:id" element={
                <AdminLayout onLogout={handleLogout}>
                  <EditProduct />
                </AdminLayout>
              } />
              <Route path="/admin-register" element={<AdminRegister />} />
              <Route path="/admin_dashboard/flash-sales" element={
                <AdminLayout onLogout={handleLogout}>
                  <FlashSales />
                </AdminLayout>
              } />
              <Route path="/admin_dashboard/customers" element={
                <AdminLayout onLogout={handleLogout}>
                  <Customers />
                </AdminLayout>
              } />
              <Route path="/admin_dashboard/orders" element={
                <AdminLayout onLogout={handleLogout}>
                  <Orders />
                </AdminLayout>
              } />
              <Route path="/admin_dashboard/report" element={
                <AdminLayout onLogout={handleLogout}>
                  <Report />
                </AdminLayout>
              } />
              <Route path="/admin_dashboard/settings" element={
                <AdminLayout onLogout={handleLogout}>
                  <Settings />
                </AdminLayout>
              } />
            </Routes>
          </Box>
          {/* Only show Footer on customer pages */}
          {!(window.location.pathname.startsWith('/admin_dashboard') || window.location.pathname.startsWith('/admin')) && <Footer />}
        </Box>
      </Router>
    </CartProvider>
  );
}

export default App;