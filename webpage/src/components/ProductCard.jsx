import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { dispatch } = useCart();
  return (
    <Card>
      <CardMedia
        component="img"
        height="160"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">{product.description}</Typography>
        <Typography variant="subtitle1" color="primary">${product.price.toFixed(2)}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/product/${product.id}`} size="small">View</Button>
        <Button onClick={() => dispatch({ type: "ADD_TO_CART", product })} size="small" variant="contained" color="primary">Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
