import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBills } from "../../utils/APIRoutes";
import axios from "axios";

const initialState = {
  bills: [],
  status: "idle",
  error: null,
};

export const fetchBills = createAsyncThunk("bill/fetchBills", async () => {
  const response = await axios.get(getBills);
  return response.data.bills;
});

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("state.bills = action.payload", action.payload);
        state.bills = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = billSlice.actions;
export default billSlice.reducer;
