import React from "react";
import pageInputs from "../data/pageInputs.json";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";


function Navbar() {
  // Get navbar data from JSON
  const navbarData = pageInputs.find((item) => item.identifier === "navbar");
  const bgColor = navbarData?.themeColor || '#fcfdfdff';
  const navLinks = navbarData?.links || ["Shop", "About", "Blog", "Contact"];
  const navTitle = navbarData?.title || "AquaScape";
  // Map link names to routes
  const linkMap = {
    Shop: "/shop",
    About: "/about",
    Blog: "/blog",
    Contact: "/contact"
  };
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: bgColor, color: 'black' }}
    >
      <Toolbar sx={{ minHeight: 64, borderBottom: '1px solid #ddd' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 'bold',
            letterSpacing: 1,
            px: 2,
            py: 0.5,
            borderRadius: 1,
          }}
          
        >
          {navTitle}
        </Typography>
        {navLinks.map((link) => (
          <Link
            key={link}
            to={linkMap[link] || '/'}
            style={{ color: 'inherit', textDecoration: 'none', marginRight: 16 }}
          >
            {link}
          </Link>
        ))}
        <IconButton component={Link} to="/cart" color="inherit">
          <ShoppingCartIcon />
        </IconButton>
        <IconButton component={Link} to="/account" color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
