import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeesRoute } from "../../utils/APIRoutes";
import axios from "axios";

const initialState = {
  employees: [],
  status: "idle",
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    const response = await axios.get(getEmployeesRoute); // Adjust the API endpoint accordingly
    return response.data.employees;
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployees: (state, action) => {
      console.log(action.payload);
      state.employees = action.payload;
    },
    addEmployee: (state, action) => {
      console.log(action.payload);
      state.employees.push(action.payload.employee);
    },
    removeEmployee: (state, action) => {
      console.log(action.payload);
      state.employees = state.employees.filter(
        (employee) => employee._id !== action.payload
      );
    },
    updateEmployee: (state, action) => {
      const updatedEmployee = action.payload.employee;

      const index = state.employees.findIndex(
        (employee) => employee._id === updatedEmployee._id
      );

      if (index !== -1) {
        state.employees[index] = updatedEmployee;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getEmployees, addEmployee, removeEmployee,updateEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
