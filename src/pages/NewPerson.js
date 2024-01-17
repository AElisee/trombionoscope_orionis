import React, { useRef, useState } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../redux/feactures/services.Slice.js";
import { getAllJobs } from "../redux/feactures/job.Slice";
import ForrmSuccessMessage from "../components/ForrmSuccessMessage";
import FormErrorMessage from "../components/FormErrorMessage";
import {
  fetchAsyncCollaboraters,
  getAllCollaboraters,
} from "../redux/feactures/Collaborater.slice";
import axios from "axios";
import { NavLink } from "react-router-dom";
import AcountExist from "../components/AcountExist.js";

const NewPerson = () => {
  const dispatch = useDispatch();
  const services = useSelector(getAllServices);
  const jobs = useSelector(getAllJobs);
  const collaboraters = useSelector(getAllCollaboraters);

  const [showMessage, setShowMessage] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  const [service, setService] = useState("");
  const [job, setJob] = useState("");
  const [grade, setGrade] = useState("");
  const [file, setFile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [landline, setLandline] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkendIn, setLinkendIn] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // verifie que les champs requis ne sont pas vides
    if (firstName && lastName && email && service && job && grade) {
      // verifier que le compte le collaborateur n'existe pas
      const collaborateurExist = collaboraters.some(
        (collaborateur) => collaborateur.email === email
      );
      if (collaborateurExist) {
        setShowMessage(true);
        setEmailExist(true);
        setTimeout(() => {
          setShowMessage(false);
          setEmailExist(false);
        }, 3000);
      } else {
        try {
          const formData = new FormData();
          formData.append("nom", lastName);
          formData.append("prenoms", firstName);
          formData.append("email", email);
          formData.append("telephone_fixe", landline);
          formData.append("telephone_portable", phone);
          formData.append("instagrammeLink", instagram);
          formData.append("linkedinLink", linkendIn);
          formData.append("photo", file);
          formData.append("poste", job);
          formData.append("biographie", bio);
          formData.append("service", service);
          formData.append("grade", grade);

          axios
            .post("http://localhost:3001/api/colaborateur/", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then(() => {
              dispatch(fetchAsyncCollaboraters());
              setShowMessage(true);
              setFormSuccess(true);
              // réinitialiser les champs
              setService("");
              setJob("");
              setFile("");
              setFirstName("");
              setLastName("");
              setEmail("");
              setPhone("");
              setLandline("");
              setInstagram("");
              setLinkendIn("");
              setBio("");

              setTimeout(() => {
                setShowMessage(false);
                setFormSuccess(false);
                window.location.reload();
              }, 3000);
            });
        } catch (error) {
          console.log("une erreur s'est produite !");
        }
      }
    } else {
      setFormError(true);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setFormError(false);
      }, 3000);
    }
  };

  return (
    <div className="newperson flex">
      <SideBar />
      <div className="newperson-ctn w100 ">
        <Topbar />
        <div className="p20 form-ctn flex flex-jcc w100">
          <div>
            <div className="form-header main-shadow w100">
              <h3 className="font-15">Ajouter un collaborateur</h3>
            </div>
            <div className="main-shadow">
              <div className="formMessage">
                {showMessage && formSuccess && (
                  <ForrmSuccessMessage message="Nouveau collaborateur ajouté" />
                )}
                {showMessage && emailExist && (
                  <AcountExist message="Ce compte existe déjà !" />
                )}
                {showMessage && formError && (
                  <FormErrorMessage
                    message={" Veuillez remplir tous les champs !"}
                  />
                )}
              </div>
              <form encType="multipart/form-data">
                <div className="services flex flex-column">
                  <label className="form_label" htmlFor="">
                    service <span>*</span>
                  </label>
                  <select
                    className="input-field"
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">Choisir une service</option>
                    {services &&
                      services
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
                    Poste <span>*</span>
                  </label>
                  <select
                    className="input-field"
                    onChange={(e) => setJob(e.target.value)}
                  >
                    <option value="">Choisir une poste</option>
                    {jobs &&
                      jobs
                        ?.slice()
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.title.toUpperCase()}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="grade flex flex-column">
                  <label className="form_label" htmlFor="">
                    Grade <span>*</span>
                  </label>
                  <input
                    className="input-field"
                    type="number"
                    placeholder="grade"
                    min={0}
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                </div>
                <div className="lastName flex flex-column">
                  <label className="form_label" htmlFor="lastName">
                    Nom <span>*</span>
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="firstName flex flex-column">
                  <label className="form_label" htmlFor="firstName">
                    Prénoms <span>*</span>
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="email  flex flex-column">
                  <label className="form_label" htmlFor="email">
                    Email <span>*</span>
                  </label>
                  <input
                    className="input-field"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="phone  flex flex-column">
                  <label className="form_label" htmlFor="phone">
                    Téléphone
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="landline  flex flex-column">
                  <label className="form_label" htmlFor="landline">
                    Téléphone fixe
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    id="landline"
                    value={landline}
                    onChange={(e) => setLandline(e.target.value)}
                  />
                </div>
                <div className="instagram  flex flex-column">
                  <label className="form_label" htmlFor="instagram">
                    Profil instagram
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div className="linkedin  flex flex-column">
                  <label className="form_label" htmlFor="linkedin">
                    Profil LinkendIn
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    id="linkedin"
                    value={linkendIn}
                    onChange={(e) => setLinkendIn(e.target.value)}
                  />
                </div>
                <div className="file  flex flex-column">
                  <label className="form_label" htmlFor="file">
                    Image
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="bio w100  flex flex-column">
                  <label className="form_label" htmlFor="bio">
                    Biographie
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="20"
                    rows="10"
                    className="w100"
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>
                <div className="submit-btn">
                  <input
                    className="sub_btn"
                    type="submit"
                    value="Envoyer"
                    onClick={handleSubmit}
                  />
                  <NavLink className="cancel_btn" to={"/collaborateur"}>
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

export default NewPerson;
