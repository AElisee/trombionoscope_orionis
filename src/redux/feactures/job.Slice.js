import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";

const initialState = {
  jobsData: [],
  jobsStatus: STATUS.IDLE,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncJobs.pending, (state, action) => {
        state.jobsStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncJobs.fulfilled, (state, { payload }) => {
        state.jobsData = payload;
        state.jobsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncJobs.rejected, (state, action) => {
        state.jobsStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncJobs = createAsyncThunk("jobs/fetch", async () => {
  const url = "http://localhost:3001/api/poste/";
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
});

export const getAllJobs = (state) => state.jobs.jobsData;
export default jobsSlice.reducer;
