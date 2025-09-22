import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#b3b3b3ff', color: 'black', py: 3, mt: 0, textAlign: 'center' }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} AquaScape. All rights reserved.
      </Typography>
      <Box sx={{ mt: 0 }}>
        <Link href="/about" color="inherit" underline="hover" sx={{ mx: 1 }}>About</Link>
        <Link href="/contact" color="inherit" underline="hover" sx={{ mx: 1 }}>Contact</Link>
        <Link href="/policy" color="inherit" underline="hover" sx={{ mx: 1 }}>Policies</Link>
      </Box>
    </Box>
  );
}

export default Footer;
