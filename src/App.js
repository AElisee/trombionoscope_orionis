import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Direction from "./pages/Direction";
import Department from "./pages/Department";
import Service from "./pages/Service";
import Job from "./pages/Job";
import Collaborater from "./pages/Collaborater";
import NewDirection from "./pages/NewDirection";
import NewDepartment from "./pages/NewDepartment";
import { useDispatch } from "react-redux";
import { fetchAsyncDirections } from "./redux/feactures/direction.Slice";
import { fetchAsyncDepartment } from "./redux/feactures/department.Slice.js";
import { fetchAsyncServices } from "./redux/feactures/services.Slice.js";
import NewService from "./pages/NewService";
import { fetchAsyncJobs } from "./redux/feactures/job.Slice";
import Newjob from "./pages/Newjob";
import NewPerson from "./pages/NewPerson";
import { fetchAsyncCollaboraters } from "./redux/feactures/Collaborater.slice";
import SinglePerson from "./pages/SinglePerson";
import DirectionDetails from "./pages/DirectionDetails.js";
import ServiceDetails from "./pages/ServiceDetails.js";
import DepartmentDetails from "./pages/DepartmentDetails.js";
import JobDetails from "./pages/JobDetails.js";
import Director from "./pages/Director.js";
import NewDirector from "./pages/NewDirector.js";
import { fetchAsyncDirector } from "./redux/feactures/director.Slice.js";
import DirectorDetails from "./pages/DirectorDetails.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncDirections());
    dispatch(fetchAsyncDepartment());
    dispatch(fetchAsyncServices());
    dispatch(fetchAsyncJobs());
    dispatch(fetchAsyncCollaboraters());
    dispatch(fetchAsyncDirector());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="direction">
          <Route index element={<Direction />} />
          <Route path="nouvelle-direction" element={<NewDirection />} />
          <Route path=":directionId" element={<DirectionDetails />} />
        </Route>
        <Route path="departement">
          <Route index element={<Department />} />
          <Route path="nouveau-departement" element={<NewDepartment />} />
          <Route path=":departmentId" element={<DepartmentDetails />} />
        </Route>
        <Route path="service">
          <Route index element={<Service />} />
          <Route path="nouveau-service" element={<NewService />} />
          <Route path=":serviceId" element={<ServiceDetails />} />
        </Route>
        <Route path="poste">
          <Route index element={<Job />} />
          <Route path="nouveau-poste" element={<Newjob />} />
          <Route path=":posteId" element={<JobDetails />} />
        </Route>
        <Route path="collaborateur">
          <Route index element={<Collaborater />} />
          <Route path="nouveau-collaborateur" element={<NewPerson />} />
          <Route path=":personId" element={<SinglePerson />} />
        </Route>
        <Route path="directeur">
          <Route index element={<Director />} />
          <Route path="ajouter-directeur" element={<NewDirector />} />
          <Route path=":directorId" element={<DirectorDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
