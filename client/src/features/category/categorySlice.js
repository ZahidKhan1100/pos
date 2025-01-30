import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesRoute } from "../../utils/APIRoutes";
import axios from "axios";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await axios.get(getCategoriesRoute); // Adjust the API endpoint accordingly
    return response.data.categories;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      console.log(action.payload);
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      console.log(action.payload);
      state.categories.push(action.payload.category);
    },
    removeCategory: (state, action) => {
      console.log(action.payload);
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
    updateCategory: (state, action) => {
      const updatedCategory = action.payload.category;

      const index = state.categories.findIndex(
        (category) => category._id === updatedCategory._id
      );

      if (index !== -1) {
        state.categories[index] = updatedCategory;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getCategories, addCategory, removeCategory, updateCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
