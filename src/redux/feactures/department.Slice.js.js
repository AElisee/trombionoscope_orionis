import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";

const initialState = {
  departmentData: [],
  departmentStatus: STATUS.IDLE,
};

export const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncDepartment.pending, (state, action) => {
        state.departmentStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncDepartment.fulfilled, (state, { payload }) => {
        state.departmentData = payload;
        state.departmentStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncDepartment.rejected, (state, action) => {
        state.departmentStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncDepartment = createAsyncThunk(
  "departelents/fetch",
  async () => {
    const url = "http://localhost:3001/api/departement/";
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

export const getAllDepartments = (state) => state.departments.departmentData;
export default departmentSlice.reducer;
