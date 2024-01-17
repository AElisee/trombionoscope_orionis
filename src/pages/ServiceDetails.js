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
  fetchAsyncServices,
  getAllServices,
} from "../redux/feactures/services.Slice.js.js";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const services = useSelector(getAllServices);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState(" ");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const service = services?.find((elt) => elt.id === parseInt(serviceId, 10));

  const handeleEdit = async (e) => {
    e.preventDefault();

    const newData = {
      nom: name ? name : service?.nom,
      description: description ? description : service.description,
    };

    try {
      await axios.patch(`${BASEURL}service/${service.id}`, newData).then(() => {
        setIsEdit(false);
        dispatch(fetchAsyncServices());
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
                  Service :
                </label>
                {isEdit ? (
                  <input
                    autoFocus
                    type="text"
                    defaultValue={name ? name : service?.nom}
                    onChange={(e) => setName(() => e.target.value)}
                  />
                ) : (
                  <p className="font-11">{service?.nom}</p>
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
                      description ? description : service?.description
                    }
                    onChange={(e) =>
                      setDescription((preDesc) => e.target.value)
                    }
                  ></textarea>
                ) : (
                  <p className="font-10">{service?.description}</p>
                )}
              </div>
              {isEdit && (
                <div className="btn-ctn">
                  <input
                    className="font-10 sub_btn"
                    type="submit"
                    value="Modifier"
                    onClick={handeleEdit}
                  />
                  <span
                    className="font-10 cancel_btn"
                    onClick={() => setIsEdit((prev) => !prev)}
                  >
                    Annuler
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

export default ServiceDetails;
