import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";
import { BASEURL } from "../../data/ApiUrl";

const initialState = {
  directorData: [],
  directorStatus: STATUS.IDLE,
};

export const directorSlice = createSlice({
  name: "directors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncDirector.pending, (state, action) => {
        state.directorStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncDirector.fulfilled, (state, { payload }) => {
        state.directorData = payload;
        state.directorStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncDirector.rejected, (state, action) => {
        state.directorStatus = STATUS.FAILED;
      });
  },
});

// get directions
export const fetchAsyncDirector = createAsyncThunk(
  "directors/fetch",
  async () => {
    const url = `${BASEURL}responsable-direction`;
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

export const getAllDirectors = (state) => state.directors.directorData;
export default directorSlice.reducer;
