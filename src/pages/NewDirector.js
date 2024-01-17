import React, { useEffect, useState } from "react";
import {
  fetchAsyncDirections,
  getAllDirections,
} from "../redux/feactures/direction.Slice";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollaboraters } from "../redux/feactures/Collaborater.slice";
import { NavLink } from "react-router-dom";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import axios from "axios";
import { BASEURL } from "../data/ApiUrl";

const NewDirector = () => {
  const directions = useSelector(getAllDirections);
  const collaboraters = useSelector(getAllCollaboraters);
  const dispatch = useDispatch();
  const [collaborater, setCollaborater] = useState("");
  const [direction, setDirection] = useState("");

  useEffect(() => {
    dispatch(fetchAsyncDirections());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (direction && collaborater) {
      const postData = {
        direction,
        collaborateur: collaborater,
      };
      try {
        await axios
          .post(`${BASEURL}responsable-direction`, postData)
          .then(() => {
            window.location.reload();
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("les champs ne doivent pas être vides");
    }
  };
  return (
    <div className="new-director flex">
      <SideBar />
      <div className="newDirector-ctn w100 ">
        <Topbar />
        <div className="p20 form-ctn flex flex-jcc w100">
          <div>
            <div className="form-header main-shadow w100">
              <h3 className="font-15">Ajouter un Directeur</h3>
            </div>
            <div className="form-ctn main-shadow">
              <div className="formMessage">
                {/* {showMessage && formSuccess && (
                  <ForrmSuccessMessage message="Nouveau département ajouté" />
                )}
                {showMessage && !formSuccess && (
                  <FormErrorMessage
                    message={" Veuillez remplir les champs obligatoires !"}
                  />
                )} */}
              </div>
              <form>
                <div className="director flex flex-column">
                  <label className="form_label" htmlFor="">
                    Direction <span>*</span>
                  </label>
                  <select
                    className="input-field"
                    onChange={(e) => setDirection(e.target.value)}
                  >
                    <option value="">Choisir une direction</option>
                    {directions &&
                      directions
                        ?.slice()
                        .sort((a, b) => a.nom.localeCompare(b.nom))
                        .map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.nom.toUpperCase()}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="job flex flex-column">
                  <label className="form_label" htmlFor="">
                    Collaborateur <span>*</span>
                  </label>
                  <select
                    className="input-field"
                    onChange={(e) => setCollaborater(e.target.value)}
                  >
                    <option value="">Choisir le responsable</option>
                    {collaboraters &&
                      collaboraters
                        ?.slice()
                        .filter(
                          (collaborater) => parseInt(collaborater.grade) > 4
                        )
                        .sort((a, b) => a.nom.localeCompare(b.nom))
                        .map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.nom.toUpperCase()}{" "}
                            {item.prenoms.toUpperCase()}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="btn-ctn">
                  <input
                    className="sub_btn"
                    type="submit"
                    value={"Enregister"}
                    onClick={handleSubmit}
                  />
                  <NavLink className="cancel_btn" to={"/directeur"}>
                    Annuler
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDirector;
