import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { BASEURL } from "../data/ApiUrl";
import {
  fetchAsyncDepartment,
  getAllDepartments,
} from "../redux/feactures/department.Slice.js";

const DepartmentDetails = () => {
  const { departmentId } = useParams();
  const departments = useSelector(getAllDepartments);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState(" ");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const department = departments?.find(
    (elt) => elt.id === parseInt(departmentId, 10)
  );

  const handeleEdit = async (e) => {
    e.preventDefault();

    const newData = {
      nom: name ? name : department?.nom,
      description: description ? description : department.description,
    };

    try {
      await axios
        .patch(`${BASEURL}departement/${department.id}`, newData)
        .then(() => {
          setIsEdit(false);
          dispatch(fetchAsyncDepartment());
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
                      <EditNoteIcon
                        style={{ fontSize: "32px", color: "#ef4444" }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              <div className="name">
                <label htmlFor="name" className="font-12">
                  Département :
                </label>
                {isEdit ? (
                  <input
                    className="input-field"
                    autoFocus
                    type="text"
                    defaultValue={name ? name : department?.nom}
                    onChange={(e) => setName(() => e.target.value)}
                  />
                ) : (
                  <p className="font-11">{department?.nom}</p>
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
                    defaultValue={
                      description ? description : department?.description
                    }
                    onChange={(e) => setDescription(() => e.target.value)}
                  ></textarea>
                ) : (
                  <p className="font-10">{department?.description}</p>
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

export default DepartmentDetails;
