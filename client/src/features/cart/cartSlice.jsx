import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getItems: (state) => {
      return state.items;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item, index) => index !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { index, value } = action.payload;
      const updatedItems = [...state.items];

      if (value === 0) {
        // Remove the item when quantity is 0
        updatedItems.splice(index, 1);
      } else {
        // Update quantity and total when quantity is non-zero
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: value,
          total: value * updatedItems[index].price, // Assuming price is available
        };
      }

      return {
        ...state,
        items: updatedItems,
      };
    },
    incrementQuantity: (state, action) => {
      const updatedItems = state.items.map((item) => {
        if (item._id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
            total: item.price * (item.quantity + 1), // Assuming price is a decimal
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        items: updatedItems,
      };
    },

    clearCart: (state) => {
      return {
        ...state,
        items: [],
      };
    },
  },
});

export const {
  getItems,
  addItem,
  removeItem,
  updateQuantity,
  incrementQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
