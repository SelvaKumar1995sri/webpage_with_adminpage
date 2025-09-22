import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
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

function App() {
  return (
    <CartProvider>
      <Router>
        <Box sx={{ width: "100vw", minHeight: "100vh", overflowX: "hidden", 
        }}>
          <Navbar />
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
              <Route path="/admin_dashboard" element={<AdminDashboard />} />
              <Route path="/admin-register" element={<AdminRegister />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </CartProvider>
  );
}

export default App;