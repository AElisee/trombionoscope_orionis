import React from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import PersonList from "../components/PersonList";
import { useSelector } from "react-redux";
import { getAllCollaboraters } from "../redux/feactures/Collaborater.slice";

const Collaborater = () => {
  const collaboraters = useSelector(getAllCollaboraters);
  return (
    <div className="collarater flex relative">
      <SideBar />
      <div className="collaborater-ctn flex-8">
        <Topbar />
        <div className="p20">
          <PersonList title={"Collaborateurs"} link={"nouveau-collaborateur"} />
        </div>
      </div>
    </div>
  );
};

export default Collaborater;
