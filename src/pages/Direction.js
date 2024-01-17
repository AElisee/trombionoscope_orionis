import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";

import { useSelector } from "react-redux";
import { getAllDirections } from "../redux/feactures/direction.Slice";
import DirList from "../components/DirList";

const Direction = () => {
  const directions = useSelector(getAllDirections);

  return (
    <div className="direction flex">
      <SideBar />
      <div className="direction-ctn flex-8">
        <Topbar />
        <div className="p20">
          <DirList
            title={"Directions"}
            link={"nouvelle-direction"}
            data={directions
              ?.slice()
              .sort((a, b) => a.nom.localeCompare(b.nom))}
            firstTh={"Direction"}
          />
        </div>
      </div>
    </div>
  );
};

export default Direction;
