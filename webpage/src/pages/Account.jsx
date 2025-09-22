
import React from "react";
import pageInputs from "../data/pageInputs.json";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, Routes, Route } from "react-router-dom";

function Orders() {
  return <Typography>Order history (dummy data coming soon...)</Typography>;
}
function Wishlist() {
  return <Typography>Wishlist (coming soon...)</Typography>;
}
function Profile() {
  return <Typography>Profile (edit address, phone coming soon...)</Typography>;
}
function Login() {
  return <Typography>Login/Register (coming soon...)</Typography>;
}

function Account() {
  const accountData = pageInputs.find((item) => item.identifier === "account");
  if (!accountData) {
    return (
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" color="error">Content upload soon</Typography>
      </Box>
    );
  }
  return (
  <Box sx={{ py: 6, background: accountData.themeColor, backgroundImage: `url(${accountData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: accountData.textColor || '#ffffff' }}>
      <Typography variant="h4" gutterBottom>{accountData.title}</Typography>
      <Typography variant="body1" gutterBottom>{accountData.description}</Typography>
      <Box sx={{ mb: 2 }}>
        <Link to="orders">My Orders</Link> | <Link to="wishlist">Wishlist</Link> | <Link to="profile">Profile</Link>
      </Box>
      <Routes>
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default Account;
