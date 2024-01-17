import React from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useSelector } from "react-redux";
import { getAllJobs } from "../redux/feactures/job.Slice";
import JobList from "../components/JobList";

const Job = () => {
  const jobs = useSelector(getAllJobs);
  return (
    <div className="jobs flex">
      <SideBar />
      <div className="jobs-ctn flex-8">
        <Topbar />
        <div className="p20">
          <JobList
            title={"postes"}
            link={"nouveau-poste"}
            data={jobs?.slice().sort((a, b) => a.title.localeCompare(b.title))}
            firstTh={"poste"}
          />
        </div>
      </div>
    </div>
  );
};

export default Job;
