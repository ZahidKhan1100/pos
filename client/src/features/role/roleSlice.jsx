import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRolesRoute } from "../../utils/APIRoutes";
import axios from "axios";
const initialState = {
  roles: [],
  status: "idle",
  error: null,
};

export const fetchRoles = createAsyncThunk("rolw/fetchRoles", async () => {
  const response = await axios.get(getRolesRoute); // Adjust the API endpoint accordingly
  return response.data.roles;
});

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    getRoles: (state, action) => {
      state.roles = action.payload;
    },
    addRole: (state, action) => {
      console.log(action.payload);
      state.roles.push(action.payload.role);
    },
    removeRole: (state, action) => {
      console.log(action.payload);
      state.roles = state.roles.filter(
        (role) => role._id !== action.payload
      );
    },
    updateRole: (state, action) => {
      const updatedRole = action.payload.role;

      const index = state.roles.findIndex(
        (role) => role._id === updatedRole._id
      );

      if (index !== -1) {
        state.roles[index] = updatedRole;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getRoles,addRole,removeRole,updateRole } = roleSlice.actions;

export default roleSlice.reducer;
