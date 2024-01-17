import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../redux/feactures/department.Slice.js.js";
import axios from "axios";
import { fetchAsyncServices } from "../redux/feactures/services.Slice.js";
import ForrmSuccessMessage from "../components/ForrmSuccessMessage";
import FormErrorMessage from "../components/FormErrorMessage";
import { BASEURL } from "../data/ApiUrl.js";
import { NavLink } from "react-router-dom";

const NewService = () => {
  const dispatch = useDispatch();
  const departments = useSelector(getAllDepartments);

  const [formError, setFormError] = useState(false);

  const [departement, setDepartement] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  // const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (departement && title) {
      try {
        const data = { departement, nom: title, description };
        await axios.post(`${BASEURL}service`, data).then(() => {
          setDepartement("");
          setTitle("");
          setDescription("");
          dispatch(fetchAsyncServices());
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
              <h3 className="font-15">Ajouter un service</h3>
            </div>
            <div className="form-ctn main-shadow">
              <div className="formMessage">
                {showMessage && formSuccess && (
                  <ForrmSuccessMessage message="Nouveau service ajouté" />
                )}
                {showMessage && !formSuccess && (
                  <FormErrorMessage
                    message={" Veuillez remplir les champs oblogatoires !"}
                  />
                )}
              </div>
              <form>
                <div className="select-dir input-label">
                  <label className="form_label">
                    Département <span>*</span>
                  </label>
                  <select onChange={(e) => setDepartement(e.target.value)}>
                    <option value="">Choisir un département</option>
                    {departments &&
                      departments?.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.nom}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="title input-label">
                  <label className="form_label">
                    Service <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="desc input-label">
                  <label className="form_label">Description</label>
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
                  <NavLink className="cancel_btn" to={"/service"}>
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

export default NewService;
