import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingeEmployee from "./page/SingleEmployee/SingeEmployee";

import HomePage from "./page/home/HomePage";

import { useDispatch } from "react-redux";
import { fetchAsyncDirection } from "./redux/direction.slice";
import DirectionsPage from "./page/directions/DirectionsPage";
import { fetchAsyncDirectors } from "./redux/directors.Slice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncDirection());
    dispatch(fetchAsyncDirectors());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/direction/:directionId" element={<DirectionsPage />} />

        <Route path="/details/:id" element={<SingeEmployee />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
