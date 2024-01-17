import React, { useState } from "react";
import Topbar from "../components/Topbar";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncCollaboraters,
  getAllCollaboraters,
} from "../redux/feactures/Collaborater.slice";
import { NavLink, useParams } from "react-router-dom";
import { BASEURL } from "../data/ApiUrl";
import { getAllJobs } from "../redux/feactures/job.Slice";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import UpdatePerson from "../components/UpdatePerson";
import EditNoteIcon from "@mui/icons-material/EditNote";

const SinglePerson = () => {
  const { personId } = useParams();
  const collaboraters = useSelector(getAllCollaboraters);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncCollaboraters());
  }, []);

  const [isEdit, setIsEdit] = useState(false);

  const person = collaboraters?.find(
    (elt) => elt.id === parseInt(personId, 10)
  );

  return (
    <div className="collarater flex">
      <SideBar />
      <div className="collaborater-ctn flex-8 p20">
        <Topbar />
        <div className="p20 main-shadow">
          {!isEdit && (
            <div className="flex details-ctn">
              <div className="left main-shadow">
                <div className="img-ctn">
                  <img
                    // src={`${BASEURL}${person?.photo}`}
                    src={
                      person?.photo
                        ? `${BASEURL}${person.photo}`
                        : "/images/default-image.jpg"
                    }
                    alt={person?.nom}
                  />
                </div>
                <div className="bottom">
                  <h3 className="font-12 name">
                    {person?.nom + " " + person?.prenoms}
                  </h3>
                  <p className="flex flex-between bb-1">
                    <span>Numéro Téléphone</span>
                    <span className="font-10">
                      {person?.telephone_portable}
                    </span>
                  </p>
                  <p className="flex flex-between bb-1">
                    <span>Fixe</span>
                    <span className="font-10">{person?.telephone_fixe}</span>
                  </p>
                  <p className="bb-1 text-right">
                    <span className="font-11">{person?.email}</span>
                  </p>
                </div>
              </div>
              <div className="right">
                <div className="top main-shadow">
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
                  <h3 className="font-12">{person?.poste.title}</h3>
                  <p className="flex flex-between bb-1">
                    <span className="font-10">Service</span>
                    <span className="font-10">{person?.service.nom}</span>
                  </p>
                  <p className="flex flex-between bb-1">
                    <span className="font-10">LinkedIn</span>
                    <a
                      className="c_pointer"
                      href={
                        person?.linkedinLink === "null"
                          ? ""
                          : person?.linkedinLink
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {person?.linkedinLink === "null"
                        ? ""
                        : person?.linkedinLink}
                    </a>
                  </p>
                  <p className="flex flex-between bb-1">
                    <span className="font-10">instagram</span>
                    <a
                      className="c_pointer"
                      href={
                        person?.instagrammeLink === "null"
                          ? ""
                          : person?.instagrammeLink
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {person?.instagrammeLink === "null"
                        ? ""
                        : person?.instagrammeLink}
                    </a>
                  </p>
                </div>
                <div className="bottom main-shadow">
                  <h3 className="font-12 bb-1">Biographie</h3>
                  <p>{person?.bographie}</p>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit alias tempore nemo aperiam error velit ipsa
                    dolor cumque assumenda molestiae rerum dicta optio quae
                    necessitatibus ab accusamus, reiciendis nesciunt molestias.
                  </span>
                </div>
              </div>
            </div>
          )}
          {isEdit && <UpdatePerson person={person} setIsEdit={setIsEdit} />}
        </div>
      </div>
    </div>
  );
};

export default SinglePerson;
