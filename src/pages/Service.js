import React from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useSelector } from "react-redux";
import { getAllServices } from "../redux/feactures/services.Slice.js";
import ServiceList from "../components/ServiceList.js";

const Service = () => {
  const services = useSelector(getAllServices);

  return (
    <div className="services flex">
      <SideBar />
      <div className="services-ctn flex-8">
        <Topbar />
        <div className="p20">
          <ServiceList
            title={"Services"}
            link={"nouveau-service"}
            data={services?.slice().sort((a, b) => a.nom.localeCompare(b.nom))}
            firstTh={"Service"}
          />
        </div>
      </div>
    </div>
  );
};

export default Service;
