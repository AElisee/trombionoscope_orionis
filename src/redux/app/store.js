import { configureStore } from "@reduxjs/toolkit";
import directionReducer from "../feactures/direction.Slice";
import departmentReducer from "../feactures/department.Slice.js";
import servicesReducer from "../feactures/services.Slice.js";
import jobReducer from "../feactures/job.Slice";
import collaboraterReducer from "../feactures/Collaborater.slice";
import directorReducer from "../feactures/director.Slice.js";

export const store = configureStore({
  reducer: {
    directions: directionReducer,
    departments: departmentReducer,
    services: servicesReducer,
    jobs: jobReducer,
    collaboraters: collaboraterReducer,
    directors: directorReducer,
  },
});
