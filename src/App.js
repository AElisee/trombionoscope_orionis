import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingeEmployee from "./page/SingleEmployee/SingeEmployee";
import GeneralPage from "./page/directions/GeneralPage";
import OperationPage from "./page/directions/OperationPage";
import InformaticPage from "./page/directions/InformaticPage";
import MarketingPage from "./page/directions/MarketingPage";
import HomePage from "./page/home/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/direction-generale" element={<GeneralPage />} />
        <Route path="/direction-operations" element={<OperationPage />} />
        <Route
          path="/direction-systeme-information"
          element={<InformaticPage />}
        />
        <Route path="/direction-marketing" element={<MarketingPage />} />
        <Route path="/details/:id" element={<SingeEmployee />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
