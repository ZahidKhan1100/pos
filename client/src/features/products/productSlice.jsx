import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsRoute } from "../../utils/APIRoutes";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get(getProductsRoute); // Adjust the API endpoint accordingly
    return response.data.products;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      console.log(action.payload);
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      console.log(action.payload);
      state.products.push(action.payload.product);
    },
    removeProduct: (state, action) => {
      console.log(action.payload);
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload.product;

      const index = state.products.findIndex(
        (product) => product._id === updatedProduct._id
      );

      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getProducts, addProduct, removeProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
