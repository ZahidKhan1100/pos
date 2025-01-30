import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dailySalesRoute } from "../../utils/APIRoutes";
import axios from "axios";

const initialState = {
  reports: [],
  status: "idle",
  error: null,
};

export const fetchDailySales = createAsyncThunk(
  "bill/fetchDailySales",
  async () => {
    const response = await axios.get(dailySalesRoute);
    console.log(response.data.dailySales);
    return response.data.dailySales;
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailySales.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDailySales.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reports = action.payload;
      })
      .addCase(fetchDailySales.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = reportSlice.actions;
export default reportSlice.reducer;
