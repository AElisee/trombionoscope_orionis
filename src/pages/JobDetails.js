import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { BASEURL } from "../data/ApiUrl";
import { fetchAsyncJobs, getAllJobs } from "../redux/feactures/job.Slice.js";

const JobDetails = () => {
  const { posteId } = useParams();
  const jobs = useSelector(getAllJobs);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const job = jobs?.find((elt) => elt.id === parseInt(posteId, 10));

  const handeleEdit = (e) => {
    e.preventDefault();

    const newData = {
      title: name ? name : job?.title,
      description: description ? description : job.description,
    };

    try {
      axios.patch(`${BASEURL}poste/${job.id}`, newData).then(() => {
        setIsEdit(false);
        dispatch(fetchAsyncJobs());
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dir-details flex">
      <SideBar />
      <div className="dirDetails-ctn flex-8">
        <Topbar />
        <div className="p20">
          <div className="main-shadow p20">
            <form>
              {!isEdit && (
                <div className="edit-btn">
                  <Tooltip
                    onClick={() => setIsEdit((prev) => !prev)}
                    title="Modifier"
                  >
                    <IconButton>
                      <EditNoteIcon style={{ color: "#ef4444" }} />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              <div className="name">
                <label htmlFor="name" className="font-12">
                  Poste :
                </label>
                {isEdit ? (
                  <input
                    className="input-field"
                    autoFocus
                    type="text"
                    defaultValue={name ? name : job?.title}
                    onChange={(e) => setName((preNom) => e.target.value)}
                  />
                ) : (
                  <p className="font-11">{job?.title}</p>
                )}
              </div>
              <div className="description">
                <label htmlFor="description" className="font-12">
                  Description :
                </label>
                {isEdit ? (
                  <textarea
                    name=""
                    id="description"
                    defaultValue={description ? description : job?.description}
                    onChange={(e) =>
                      setDescription((preDesc) => e.target.value)
                    }
                  ></textarea>
                ) : (
                  <p className="font-10">{job?.description}</p>
                )}
              </div>
              {isEdit && (
                <div className="btn-ctn">
                  <input
                    className="font-10 sub_btn"
                    type="submit"
                    value="Modifier"
                    onClick={handeleEdit}
                  />{" "}
                  <span
                    className="font-10"
                    onClick={() => setIsEdit((prev) => !prev)}
                  >
                    Abandonner
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
