import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";

const initialState = {
  servicesData: [],
  servicesStatus: STATUS.IDLE,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncServices.pending, (state, action) => {
        state.servicesStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncServices.fulfilled, (state, { payload }) => {
        state.servicesData = payload;
        state.servicesStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncServices.rejected, (state, action) => {
        state.servicesStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncServices = createAsyncThunk(
  "services/fetch",
  async () => {
    const url = "http://localhost:3001/api/service/";
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

export const getAllServices = (state) => state.services.servicesData;
export default servicesSlice.reducer;
