import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllDirections } from "../redux/feactures/direction.Slice";
import { fetchAsyncDepartment } from "../redux/feactures/department.Slice.js";
import axios from "axios";
import ForrmSuccessMessage from "../components/ForrmSuccessMessage";
import FormErrorMessage from "../components/FormErrorMessage";
import { NavLink } from "react-router-dom";

const NewDepartment = () => {
  const dispatch = useDispatch();
  const directions = useSelector(getAllDirections);
  const [direction, setDirection] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (direction && title) {
      try {
        const data = { direction, nom: title, description };
        await axios
          .post("http://localhost:3001/api/departement/", data)
          .then(() => {
            setDirection("");
            setTitle("");
            setDescription("");
            dispatch(fetchAsyncDepartment());
            setShowMessage(true);
            setFormSuccess(true);

            setTimeout(() => {
              setShowMessage(false);
              setFormSuccess(false);
            }, 3000);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setFormError(true);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <div className="new-dept flex">
      <SideBar />
      <div className="newDept-ctn w100 ">
        <Topbar />
        <div className="p20 form-ctn flex flex-jcc w100">
          <div>
            <div className="form-header main-shadow w100">
              <h3 className="font-15">Ajouter un Département</h3>
            </div>
            <div className="form-ctn main-shadow">
              <div className="formMessage">
                {showMessage && formSuccess && (
                  <ForrmSuccessMessage message="Nouveau département ajouté" />
                )}
                {showMessage && !formSuccess && (
                  <FormErrorMessage
                    message={" Veuillez remplir les champs obligatoires !"}
                  />
                )}
              </div>
              <form>
                <div className="select-dir input-label">
                  <label className="form_label">
                    Direction <span>*</span>
                  </label>
                  <select onChange={(e) => setDirection(e.target.value)}>
                    <option value="">Choisir une direction</option>
                    {directions &&
                      directions?.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.nom}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="title input-label">
                  <label className="form_label">
                    Département <span>*</span>
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="desc input-label">
                  <label className="form_label">Descrption</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="btn ">
                  <input
                    className="sub_btn"
                    type="submit"
                    value={"Enregister"}
                    onClick={handleSubmit}
                  />
                  <NavLink className="cancel_btn" to={"/departement"}>
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

export default NewDepartment;
