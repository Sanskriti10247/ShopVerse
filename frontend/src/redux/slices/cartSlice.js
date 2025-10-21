import { createSlice } from "@reduxjs/toolkit";

const getUserId = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo ? userInfo._id : "guest";
};

const loadCart = (userId = null) => {
  const uid = userId || getUserId();
  const saved = localStorage.getItem(`cart_${uid}`);
  return saved ? JSON.parse(saved) : [];
};

const saveCart = (cartItems, userId = null) => {
  const uid = userId || getUserId();
  localStorage.setItem(`cart_${uid}`, JSON.stringify(cartItems));
};

const initialState = {
  cartItems: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        if (item.qty > 0) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          );
        } else {
          state.cartItems = state.cartItems.filter(
            (x) => x.product !== existItem.product
          );
        }
      } else if (item.qty > 0) {
        state.cartItems.push(item);
      }

      saveCart(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
      saveCart(state.cartItems);
    },

    clearCart: (state) => {
      const userId = getUserId();
      state.cartItems = [];
      localStorage.removeItem(`cart_${userId}`); 
    },

    resetCartState: (state) => {
      state.cartItems = [];
    },

    loadUserCart: (state) => {
      state.cartItems = loadCart();
    },

    loadCartForUser: (state, action) => {
      state.cartItems = loadCart(action.payload); 
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  resetCartState,
  loadUserCart,
  loadCartForUser,
} = cartSlice.actions;
export default cartSlice.reducer;
