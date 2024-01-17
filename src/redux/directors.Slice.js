import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { baseUrl } from "../utils/apiUrl";

const initialState = {
  directorData: [],
  directorsStatus: STATUS.IDLE,
};

export const directorSlice = createSlice({
  name: "directors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncDirectors.pending, (state, action) => {
        state.directorsStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncDirectors.fulfilled, (state, { payload }) => {
        state.directorData = payload;
        state.directorsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncDirectors.rejected, (state, action) => {
        state.directorsStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncDirectors = createAsyncThunk(
  "directors/fetch",
  async () => {
    const url = `${baseUrl}responsable-direction`;
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
export const getdirectorsStatus = (state) => state.directors.directorsStatus;
export default directorSlice.reducer;
