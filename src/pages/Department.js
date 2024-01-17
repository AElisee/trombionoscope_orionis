import React from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useSelector } from "react-redux";
import { getAllDepartments } from "../redux/feactures/department.Slice.js";
import DeptList from "../components/DeptList.js";

const Department = () => {
  const departments = useSelector(getAllDepartments);

  return (
    <div className="department flex">
      <SideBar />
      <div className="department-ctn flex-8">
        <Topbar />
        <div className="p20">
          <DeptList
            title={"Départements"}
            link={"nouveau-departement"}
            data={departments
              ?.slice()
              .sort((a, b) => a.nom.localeCompare(b.nom))}
            firstTh={"Département"}
          />
        </div>
      </div>
    </div>
  );
};

export default Department;
