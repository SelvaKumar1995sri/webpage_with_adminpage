
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
// import products from "../data/products.json";
import pageInputs from "../data/pageInputs.json";
import { useLocation } from "react-router-dom";

function Shop() {
  const shopData = pageInputs.find((item) => item.identifier === "shop");
  const location = useLocation();
  // Parse category from query string
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("cat");
  // Use products from shopData
  const products = shopData?.products || [];
  // Get unique categories from products
  const categories = Array.from(new Set(products.map((p) => p.category)));
  // Filter products by category if selected
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  if (!shopData) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" color="error">Content upload soon</Typography>
      </Container>
    );
  }
  return (
  <Container sx={{ py: 6, background: shopData.themeColor, backgroundImage: `url(${shopData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: shopData.textColor || '#ffffff' }}>
      <Typography variant="h4" gutterBottom>{shopData.title}</Typography>
      <Typography variant="body1" gutterBottom>{shopData.description}</Typography>
      {/* Category Sidebar */}
      {/* <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Categories</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
          {categories.map((cat) => (
            <a
              key={cat}
              href={`?cat=${encodeURIComponent(cat)}`}
              style={{ textDecoration: 'none' }}
              
            >
              <Box sx={{ bgcolor: 'primary.light', px: 2, py: 1, borderRadius: 2, cursor: 'pointer', color: 'black' }}>{cat}</Box>
            </a>
          ))}
        </Box>
      </Box> */}
      {/* Product Grid */}
      <Grid container spacing={3}>
        {filteredProducts.length === 0 ? (
          <Typography variant="body1" sx={{ px: 2 }}>No products found for selected category.</Typography>
        ) : (
          filteredProducts.map((product, idx) => (
            <Grid item xs={12} sm={6} md={4} key={product.name + idx}>
              <Box sx={{ border: '1px solid #eee', borderRadius: 2, p: 2, bgcolor: 'white', color: 'black' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8 }} />
                <Typography variant="h6" sx={{ mt: 1,color: 'black' }}>{product.name}</Typography>
                <Typography variant="body2">Category: {product.category}</Typography>
                <Typography variant="body2">Cost: ${product.cost.toFixed(2)}</Typography>
                <Typography variant="body2" color="success.main">Discount: {Math.round(product.discount * 100)}%</Typography>
                <Typography variant="body1" color="primary">After Discount: ${product.amountAfterDiscount.toFixed(2)}</Typography>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Shop;
