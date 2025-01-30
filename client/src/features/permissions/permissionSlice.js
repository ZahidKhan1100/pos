import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPermissionsRoute } from "../../utils/APIRoutes";
import axios from "axios";
const initialState = {
  permissions: [],
  status: "idle",
  error: null,
};

export const fetchPermissions = createAsyncThunk(
  "permission/fetchPermissions",
  async () => {
    const response = await axios.get(getPermissionsRoute); // Adjust the API endpoint accordingly
    return response.data.permissions;
  }
);

export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    getPermissions: (state, action) => {
      state.permissions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getPermissions } = permissionSlice.actions;

export default permissionSlice.reducer;
