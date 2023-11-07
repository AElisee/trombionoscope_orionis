import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const initialState = {
  employeesData: [],
  employesStatus: STATUS.IDLE,
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncEmployees.pending, (state, action) => {
        state.employesStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncEmployees.fulfilled, (state, { payload }) => {
        state.employeesData = payload;
        state.employesStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncEmployees.rejected, (state, action) => {
        state.employesStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncEmployees = createAsyncThunk(
  "employees/fetch",
  async () => {
    const url = "http://localhost:3000/employes";
    // const url = "http://192.168.1.14:3000/api/colaborateur/";
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAllEmployees = (state) => state.employees.employeesData;
export const getEmployesStatus = (state) => state.employees.employesStatus;
export default employeeSlice.reducer;
