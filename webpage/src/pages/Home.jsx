import React from "react";
import pageInputs from "../data/pageInputs.json";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const homeData = pageInputs.find((item) => item.identifier === "home");
  const shopData = pageInputs.find((item) => item.identifier === "shop");
  const categories = shopData?.products ? Array.from(new Set(shopData.products.map(p => p.category))) : [];
  const products = shopData?.products || [];
  const navigate = useNavigate();

  if (!homeData) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="error">Content upload soon</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: homeData.themeColor, color: homeData.textColor || '#fff', minHeight: '100vh' }}>
      {/* Navbar placeholder (should be in Navbar.jsx) */}
      {/* Category Bar */}
      <Container sx={{ pt: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {categories.map((cat, idx) => {
            // Get bg color and image from JSON
            const catData = shopData.categories?.[cat];
            const catBgColor = catData?.bgColor || '#fff';
            const catImg = catData?.img || '';
            return (
              <Grid item key={cat} xs={12} sm={6} md={2}>
                <Card
                  sx={{
                    bgcolor: catBgColor,
                    color: '#253D5E',
                    cursor: 'pointer',
                    boxShadow: 2,
                    p: 1,
                    minHeight: 160,
                    minWidth: 300,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 8,
                    textAlign: 'left',
                  }}
                  onClick={() => navigate(`/shop?cat=${encodeURIComponent(cat)}`)}
                >
                  <CardContent sx={{ pt: 0, flex: 1 }}>
                    <Box
                      sx={{
                        alignItems: 'left',
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        {cat}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{ mt: 1 }}
                      >
                        Shop Now
                      </Button>
                    </Box>
                  </CardContent>
                  {/* Category image on right side from JSON */}
                  {catImg && (
                    <Box sx={{ pr: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                      <img
                        src={catImg}
                        alt={cat}
                        style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 8, aspectRatio: '1/1', background: 'transparent' }}
                      />
                    </Box>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Hero Section */}
      {/* <Container sx={{ py: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h3" fontWeight={700} gutterBottom>{homeData.title}</Typography>
              <Typography variant="h5" gutterBottom>{homeData.description}</Typography>
              <Button component={Link} to="/shop" variant="contained" color="secondary" size="large" sx={{ mt: 2 }}>Shop Now</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {homeData.themeImage && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src={homeData.themeImage} alt="Hero" style={{ maxWidth: '100%', borderRadius: 16 }} />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container> */}

      {/* Trending Products */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>Trending Products</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {products.slice(0, 8).map((product, idx) => (
            <Grid item xs={12} sm={6} md={3} key={product.name + idx}>
              <Card sx={{ bgcolor: '#fff', color: 'black', boxShadow: 1 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>{product.name}</Typography>
                  <Typography variant="body2">${product.amountAfterDiscount.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      

      {/* Product Grids (example: Aquarium Accessories) */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>Aquarium Accessories</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {products.filter(p => p.category === 'Aquarium Accessories').map((product, idx) => (
            <Grid item xs={12} sm={6} md={3} key={product.name + idx}>
              <Card sx={{ bgcolor: '#fff', color: 'black', boxShadow: 1 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>{product.name}</Typography>
                  <Typography variant="body2">${product.amountAfterDiscount.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Info Bar */}
      <Box sx={{ backgroundColor: '#b3b3b3ff', color: '#000000ff', py: 2, textAlign: 'center', fontWeight: 600, borderBottom: '1px solid #ddd' }}>
        Our online store offers a variety of high-quality aquarium accessories for purchase
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#b3b3b3ff', color: 'black', py: 4, borderBottom: '1px solid #ddd' }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight={600}>Featured Products</Typography>
              <ul>
                {products.slice(0, 5).map((product, idx) => (
                  <li key={product.name + idx}>{product.name} - ${product.amountAfterDiscount.toFixed(2)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight={600}>Contact Details</Typography>
              <Typography variant="body2">Email: support@aquascape.com</Typography>
              <Typography variant="body2">Phone: +1-234-567-8901</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
