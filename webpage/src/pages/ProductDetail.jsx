

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { dispatch } = useCart();
  const productDetailData = pageInputs.find((item) => item.identifier === "productDetail");
  if (!productDetailData) {
    return <Typography variant="h4" color="error">Content upload soon</Typography>;
  }
  if (!product) return <Typography>Product not found.</Typography>;
  return (
    <Box sx={{ py: 6, background: productDetailData.themeColor, backgroundImage: `url(${productDetailData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Typography variant="h4" gutterBottom>{productDetailData.title}</Typography>
      <Typography variant="body1" gutterBottom>{productDetailData.description}</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 8 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="h6" color="primary">${product.price.toFixed(2)}</Typography>
          <Typography variant="body1" sx={{ my: 2 }}>{product.description}</Typography>
          <Button variant="contained" color="primary" onClick={() => dispatch({ type: "ADD_TO_CART", product })} sx={{ mb: 2 }}>Add to Cart</Button>
          <Typography variant="subtitle1" sx={{ mt: 4 }}>Related Products (coming soon...)</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetail;
