import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useSelector } from "react-redux";
import { getAllDirections } from "../redux/feactures/direction.Slice";
import DirectorList from "../components/DirectorList";
import { getAllDirectors } from "../redux/feactures/director.Slice";

const Director = () => {
  const directors = useSelector(getAllDirectors);

  return (
    <div className="direction flex">
      <SideBar />
      <div className="direction-ctn flex-8">
        <Topbar />
        <div className="p20">
          <DirectorList
            title={"Directeurs"}
            link={"ajouter-directeur"}
            data={directors}
            firstTh={"Direction"}
          />
        </div>
      </div>
    </div>
  );
};

export default Director;
