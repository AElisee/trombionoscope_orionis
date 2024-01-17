import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { fetchAsyncDirections } from "../redux/feactures/direction.Slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ForrmSuccessMessage from "../components/ForrmSuccessMessage";
import FormErrorMessage from "../components/FormErrorMessage";

const NewDirection = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title) {
      try {
        const data = { nom: title, description };
        await axios
          .post("http://localhost:3001/api/direction/", data)
          .then(() => {
            setTitle("");
            setDescription("");
            dispatch(fetchAsyncDirections());
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
    <div className="new-direction flex">
      <SideBar />
      <div className="newDirection-ctn w100 ">
        <Topbar />
        <div className="p20 form-ctn flex w100">
          <div>
            <div className="form-header main-shadow w100">
              <h3 className="font-15">Ajouter une Direction</h3>
            </div>
            <div className="form-ctn main-shadow">
              <div className="formMessage">
                {showMessage && formSuccess && (
                  <ForrmSuccessMessage message=" Nouvelle direction enregistrée" />
                )}
                {showMessage && !formSuccess && (
                  <FormErrorMessage
                    message={" Veuillez remplir les champs obligatorires !"}
                  />
                )}
              </div>
              <form>
                <div className="title input-label">
                  <label className="form_label">
                    Direction <span>*</span>
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
                  <NavLink className="cancel_btn" to={"/direction"}>
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

export default NewDirection;
