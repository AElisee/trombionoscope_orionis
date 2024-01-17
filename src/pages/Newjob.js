import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchAsyncJobs } from "../redux/feactures/job.Slice";
import ForrmSuccessMessage from "../components/ForrmSuccessMessage";
import FormErrorMessage from "../components/FormErrorMessage";
import { BASEURL } from "../data/ApiUrl";
import { NavLink } from "react-router-dom";

const Newjob = () => {
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
        const data = { title, description };
        await axios.post(`${BASEURL}poste`, data).then(() => {
          setTitle("");
          setDescription("");
          dispatch(fetchAsyncJobs());
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
    <div className="new-job flex">
      <SideBar />
      <div className="newJob-ctn w100 ">
        <Topbar />
        <div className="p20 form-ctn flex w100">
          <div>
            <div className="form-header main-shadow w100">
              <h3 className="font-15">Ajouter un poste</h3>
            </div>
            <div className="form-ctn main-shadow">
              <div className="formMessage">
                {showMessage && formSuccess && (
                  <ForrmSuccessMessage message="Nouveau post ajouté" />
                )}
                {showMessage && !formSuccess && (
                  <FormErrorMessage
                    message={" Veuillez remplir les champs obligatoires !"}
                  />
                )}
              </div>
              <form>
                <div className="title input-label">
                  <label className="form_label">
                    Poste <span>*</span>
                  </label>
                  <input
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
                  <NavLink className="cancel_btn" to={"/poste"}>
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

export default Newjob;
