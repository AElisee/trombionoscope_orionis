import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { baseUrl } from "../utils/apiUrl";

const initialState = {
  directionData: [],
  directionStatus: STATUS.IDLE,
};

export const directionSlice = createSlice({
  name: "directions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncDirection.pending, (state, action) => {
        state.employesStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncDirection.fulfilled, (state, { payload }) => {
        state.directionData = payload;
        state.directionStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncDirection.rejected, (state, action) => {
        state.directionStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncDirection = createAsyncThunk(
  "direction/fetch",
  async () => {
    const url = `${baseUrl}direction/`;
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

export const getAllDirections = (state) => state.directions.directionData;
export const getDirectionStatus = (state) => state.directions.directionStatus;
export default directionSlice.reducer;
