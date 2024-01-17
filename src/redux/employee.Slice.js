import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { baseUrl } from "../utils/apiUrl";

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
    const url = `${baseUrl}colaborateur/`;
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
// obtenir les employés de chaque direction

export const getAllEmployees = (state) => state.employees.employeesData;
export const getEmployesStatus = (state) => state.employees.employesStatus;
export default employeeSlice.reducer;
