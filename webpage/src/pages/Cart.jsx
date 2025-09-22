
import React from "react";
import { useCart } from "../context/CartContext";
import pageInputs from "../data/pageInputs.json";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Cart() {
  const { state, dispatch } = useCart();
  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  const cartData = pageInputs.find((item) => item.identifier === "cart");
  if (!cartData) {
    return (
      <Box sx={{ py: 6, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h4" color="error">Content upload soon</Typography>
      </Box>
    );
  }
  return (
  <Box sx={{ p: 6, maxWidth: 600, mx: 'auto', background: cartData.themeColor, backgroundImage: `url(${cartData.themeImage})`, backgroundSize: 'cover', backgroundPosition: 'center', color: cartData.textColor || '#ffffff' }}>
      <Typography variant="h4" gutterBottom>{cartData.title}</Typography>
      <Typography variant="body1" gutterBottom>{cartData.description}</Typography>
      <List>
        {state.cart.length === 0 && <Typography>Your cart is empty.</Typography>}
        {state.cart.map((item) => (
          <ListItem key={item.id} secondaryAction={
            <IconButton edge="end" onClick={() => dispatch({ type: "REMOVE_FROM_CART", id: item.id })}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 2 }}>Subtotal: ${subtotal.toFixed(2)}</Typography>
      <Button
        component={Link}
        to="/checkout"
        variant="contained"
        color="secondary"
        size="large"
        sx={{ mt: 3, px: 4, py: 1.5, borderRadius: 2, fontWeight: 600, boxShadow: 2 }}
      >
        Checkout
      </Button>
    </Box>
  );
}

export default Cart;
