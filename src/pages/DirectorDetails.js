import React, { useState } from "react";
import Topbar from "../components/Topbar";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { getAllDirections } from "../redux/feactures/direction.Slice";
import { getAllCollaboraters } from "../redux/feactures/Collaborater.slice";
import axios from "axios";
import { BASEURL } from "../data/ApiUrl";
import { getAllDirectors } from "../redux/feactures/director.Slice";

const DirectorDetails = () => {
  const directors = useSelector(getAllDirectors);
  const [isEdit, setIsEdit] = useState(false);
  const { directorId } = useParams();
  const directions = useSelector(getAllDirections);
  const collaboraters = useSelector(getAllCollaboraters);
  const [collaborater, setCollaborater] = useState("");
  const [direction, setDirection] = useState("");

  const director = directors?.find(
    (elt) => elt.id === parseInt(directorId, 10)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        direction: directions.find(
          (item) => parseInt(item.id) === parseInt(direction)
        ),
        collaborateur: collaboraters.find(
          (item) => parseInt(item.id) === parseInt(collaborater)
        ),
      };
      await axios
        .patch(`${BASEURL}responsable-direction/${director.id}`, postData)
        .then(() => {
          setIsEdit(false);
          window.location.reload();
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
              <div className="director flex flex-column">
                <label className="form_label font-12">
                  Direction <span>{isEdit ? "*" : ""}</span>
                </label>
                {isEdit ? (
                  <select
                    className="input-field"
                    onChange={(e) => setDirection(e.target.value)}
                  >
                    <option value={director.direction.id}>
                      {director.direction.nom.toUpperCase()}
                    </option>
                    {directions &&
                      directions
                        ?.slice()
                        .filter((item) => item.id != director.direction.id)
                        .sort((a, b) => a.nom.localeCompare(b.nom))
                        .map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.nom.toUpperCase()}
                          </option>
                        ))}
                  </select>
                ) : (
                  <p className="font-10">{director?.direction?.nom}</p>
                )}
              </div>
              <div className="job flex flex-column">
                <label className="form_label font-12">
                  Directeur <span>{isEdit ? "*" : ""}</span>
                </label>
                {isEdit ? (
                  <select
                    className="input-field"
                    onChange={(e) => setCollaborater(e.target.value)}
                  >
                    <option value={director.collaborateur.id}>
                      {director.collaborateur.prenoms}{" "}
                      {director.collaborateur.nom}
                    </option>
                    {collaboraters &&
                      collaboraters
                        ?.slice()
                        .filter(
                          (collaborater) => parseInt(collaborater.grade) > 3
                        )
                        .filter(
                          (collaborater) =>
                            collaborater.id != director.collaborateur.id
                        )
                        .sort((a, b) => a.nom.localeCompare(b.title))
                        .map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.nom.toUpperCase()}{" "}
                            {item.prenoms.toUpperCase()}
                          </option>
                        ))}
                  </select>
                ) : (
                  <p className="font-10">
                    {director?.collaborateur?.nom}{" "}
                    {director?.collaborateur?.prenoms}
                  </p>
                )}
              </div>
              {isEdit ? (
                <div className="btn-ctn">
                  <input
                    className="sub_btn"
                    type="submit"
                    value={"Enregister"}
                    onClick={handleSubmit}
                  />
                  <NavLink className="cancel_btn" to={"/directeur"}>
                    Abandonner
                  </NavLink>
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorDetails;
