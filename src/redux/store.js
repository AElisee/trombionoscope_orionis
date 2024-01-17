import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employee.Slice";
import directionReducer from "./direction.slice";
import directorsReducer from "./directors.Slice";
import dirEmployeesReducer from "./thisDirectionEmployees.slice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    directions: directionReducer,
    directors: directorsReducer,
    directionEmployees: dirEmployeesReducer,
  },
});
