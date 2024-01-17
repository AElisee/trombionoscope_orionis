import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/apiUrl";
import { STATUS } from "../utils/status";

const initialState = {
  DirEmployeesData: [],
  DiremployesStatus: STATUS.IDLE,
};
export const DirEmployees = createSlice({
  name: "directionEmployees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncthisDirEmployees.pending, (state, action) => {
        state.DiremployesStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncthisDirEmployees.fulfilled, (state, { payload }) => {
        state.DirEmployeesData = payload;
        state.DiremployesStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncthisDirEmployees.rejected, (state, action) => {
        state.DiremployesStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncthisDirEmployees = createAsyncThunk(
  "thisDirectionemployees/fetch",
  async (directionId) => {
    const url = `${baseUrl}colaborateur/?directionId=${directionId}`;
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

export const getDirEmployees = (state) =>
  state.directionEmployees.DirEmployeesData;
export const getDirEmployesStatus = (state) =>
  state.directionEmployees.DiremployesStatus;
export default DirEmployees.reducer;
