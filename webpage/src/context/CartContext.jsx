import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.product] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((p) => p.id !== action.id) };
    case "UPDATE_CART":
      return { ...state, cart: action.cart };
    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...state.wishlist, action.product] };
    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter((p) => p.id !== action.id) };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
