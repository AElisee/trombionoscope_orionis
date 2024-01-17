import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useParams } from "react-router-dom";
import {
  fetchAsyncDirections,
  getAllDirections,
} from "../redux/feactures/direction.Slice";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { BASEURL } from "../data/ApiUrl";

const DirectionDetails = () => {
  const { directionId } = useParams();
  const directions = useSelector(getAllDirections);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const direction = directions?.find(
    (elt) => elt.id === parseInt(directionId, 10)
  );

  const handeleEdit = async (e) => {
    e.preventDefault();

    const newData = {
      nom: name ? name : direction?.nom,
      description: description || direction.description,
    };

    try {
      axios.patch(`${BASEURL}direction/${direction.id}`, newData).then(() => {
        setIsEdit(false);
        dispatch(fetchAsyncDirections());
      });
    } catch (error) {
      console.log(error);
    }
  };

  // recupère les departements de la direction selectionnée
  // const departments = direction.departement;

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
                  Direction :
                </label>
                {isEdit ? (
                  <input
                    className="input-field"
                    autoFocus
                    type="text"
                    defaultValue={name || direction?.nom}
                    onChange={(e) => setName(() => e.target.value)}
                  />
                ) : (
                  <p className="font-11">{direction?.nom}</p>
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
                    defaultValue={description || direction?.description}
                    onChange={(e) => setDescription(() => e.target.value)}
                  ></textarea>
                ) : (
                  <p className="font-10">{direction?.description}</p>
                )}
              </div>
              {isEdit && (
                <div className="btn-ctn">
                  <input
                    className="font-10 c_pointer sub_btn"
                    type="submit"
                    value="Modifier"
                    onClick={handeleEdit}
                  />{" "}
                  <span
                    className="font-10 c_pointer"
                    onClick={() => setIsEdit((prev) => !prev)}
                  >
                    Abandonner
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* <div>
          <DeptList
            title={`${direction?.nom}/Départements`}
            link={"/departement/nouveau-departement"}
            data={departments
              ?.slice()
              .sort((a, b) => a.nom.localeCompare(b.nom))}
            firstTh={"Département"}
          />
        </div> */}
      </div>
    </div>
  );
};

export default DirectionDetails;
