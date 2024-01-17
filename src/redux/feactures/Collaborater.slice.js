import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";
import { BASEURL } from "../../data/ApiUrl";

const initialState = {
  collaboratersData: [],
  collaboratersStatus: STATUS.IDLE,
};

export const collaboratersSlice = createSlice({
  name: "collaboraters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCollaboraters.pending, (state, action) => {
        state.collaboratersStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncCollaboraters.fulfilled, (state, { payload }) => {
        state.collaboratersData = payload;
        state.collaboratersStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncCollaboraters.rejected, (state, action) => {
        state.collaboratersStatus = STATUS.FAILED;
      })

      .addCase(deleteAsyncCollaboraters.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.collaboratersData = state.collaboratersData.filter(
          (person) => person.id !== deletedId
        );
      });
  },
});

// GET
export const fetchAsyncCollaboraters = createAsyncThunk(
  " collaboraters/fetch",
  async () => {
    const url = "http://localhost:3001/api/colaborateur/";
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

export const deleteAsyncCollaboraters = createAsyncThunk(
  "collaboraters/delete",
  async (personId) => {
    const url = `${BASEURL}${personId}`;
    const options = {
      method: "delete",
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return personId;
      } else {
        throw new Error("La suppression a échoué");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAllCollaboraters = (state) => {
  return state.collaboraters.collaboratersData;
};

export default collaboratersSlice.reducer;
