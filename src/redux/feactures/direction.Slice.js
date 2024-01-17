import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";

const initialState = {
  directionsData: [],
  directionsStatus: STATUS.IDLE,
};

export const directionsSlice = createSlice({
  name: "directions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncDirections.pending, (state, action) => {
        state.directionsStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncDirections.fulfilled, (state, { payload }) => {
        state.directionsData = payload;
        state.directionsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncDirections.rejected, (state, action) => {
        state.directionsStatus = STATUS.FAILED;
      });
  },
});

// get directions
export const fetchAsyncDirections = createAsyncThunk(
  "directions/fetch",
  async () => {
    const url = "http://localhost:3001/api/direction/";
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

export const getAllDirections = (state) => state.directions.directionsData;
export default directionsSlice.reducer;
