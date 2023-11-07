import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employee.Slice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});
