import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../redux/feactures/services.Slice.js";
import { getAllJobs } from "../redux/feactures/job.Slice";
import FormErrorMessage from "./FormErrorMessage.js";
import ForrmSuccessMessage from "./ForrmSuccessMessage.js";
import axios from "axios";
import { fetchAsyncCollaboraters } from "../redux/feactures/Collaborater.slice.js";

const UpdatePerson = ({ person, setIsEdit }) => {
  const dispatch = useDispatch();
  const services = useSelector(getAllServices);
  const jobs = useSelector(getAllJobs);

  const [showMessage, setShowMessage] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [service, setService] = useState("");
  const [job, setJob] = useState("");
  const [file, setFile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [landline, setLandline] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkendIn, setLinkendIn] = useState("");
  const [bio, setBio] = useState("");
  const [grade, setGrade] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nom", lastName ? lastName : person.nom);
      formData.append("prenoms", firstName ? firstName : person.prenoms);
      formData.append("email", email ? email : person.email);
      formData.append(
        "telephone_fixe",
        landline ? landline : person.telephone_fixe
      );
      formData.append(
        "telephone_portable",
        phone ? phone : person.telephone_portable
      );
      formData.append(
        "instagrammeLink",
        instagram ? instagram : person.instagrammeLink
      );
      formData.append(
        "linkedinLink",
        linkendIn ? linkendIn : person.linkedinLink
      );
      formData.append("photo", file ? file : person.photo ? person.photo : "");
      formData.append("poste", job ? job : person.poste.id);
      formData.append("biographie", bio ? bio : person.biographie);
      formData.append("service", service ? service : person.service.id);
      formData.append("grade", grade ? grade : person.grade);

      await axios
        .patch(
          `http://localhost:3001/api/colaborateur/${person.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(() => {
          dispatch(fetchAsyncCollaboraters());
          setShowMessage(true);
          setFormSuccess(true);
          setIsEdit((edit) => !edit);

          setTimeout(() => {
            setShowMessage(false);
            setFormSuccess(false);
          }, 3000);
        });
    } catch (error) {
      setFormError(true);
      setShowMessage(true);
    }
  };

  return (
    <div className="update-person">
      <form encType="multipart/form-data">
        <div className="services flex flex-column">
          <label htmlFor="" className="form_label">
            Service
          </label>
          <select
            className="input-field"
            onChange={(e) => setService(e.target.value)}
          >
            <option value={person?.service.id}>{person?.service.nom}</option>
            {services &&
              services
                ?.filter((elt) => elt.id != person?.service.id)
                .map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.nom}
                  </option>
                ))}
          </select>
        </div>
        <div className="job flex flex-column">
          <label htmlFor="" className="form_label">
            Poste <span>*</span>
          </label>
          <select
            className="input-field"
            onChange={(e) => setJob(e.target.value)}
          >
            <option value={person?.poste.id}>{person?.poste.title}</option>
            {jobs &&
              jobs
                ?.filter((elt) => elt.id != person?.poste.id)
                .map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.title}
                  </option>
                ))}
          </select>
        </div>
        <div className="grade  flex flex-column">
          <label htmlFor="grade" className="form_label">
            Grade <span>*</span>
          </label>
          <input
            className="input-field"
            type="number"
            min={0}
            defaultValue={grade ? grade : person?.grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <div className="lastName flex flex-column">
          <label htmlFor="lastName" className="form_label">
            Nom <span>*</span>
          </label>
          <input
            className="input-field"
            type="text"
            id="lastName"
            defaultValue={lastName ? lastName : person.nom}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="firstName flex flex-column">
          <label htmlFor="firstName" className="form_label">
            Prénom <span>*</span>
          </label>
          <input
            className="input-field"
            type="text"
            id="firstName"
            defaultValue={firstName ? firstName : person?.prenoms}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="email flex flex-column">
          <label htmlFor="email" className="form_label">
            Email <span>*</span>
          </label>
          <input
            className="input-field"
            type="email"
            id="email"
            defaultValue={email ? email : person.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="phone flex flex-column">
          <label htmlFor="phone" className="form_label">
            Téléphone
          </label>
          <input
            className="input-field"
            type="text"
            id="phone"
            defaultValue={phone ? phone : person.telephone_portable}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="landline flex flex-column">
          <label htmlFor="landline" className="form_label">
            Téléphone fixe :
          </label>
          <input
            className="input-field"
            type="text"
            id="landline"
            defaultValue={landline ? landline : person.telephone_fixe}
            onChange={(e) => setLandline(e.target.value)}
          />
        </div>
        <div className="instagram flex flex-column">
          <label htmlFor="instagram" className="form_label">
            profil instagram :
          </label>
          <input
            className="input-field"
            type="text"
            id="instagram"
            defaultValue={
              instagram ||
              (person.instagrammeLink === "null" ? "" : person.instagrammeLink)
            }
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
        <div className="linkedin flex flex-column">
          <label className="form_label" htmlFor="linkedin">
            profil LinkendIn
          </label>
          <input
            className="input-field"
            type="text"
            id="linkedin"
            defaultValue={
              linkendIn || person?.linkedinLink === "null"
                ? ""
                : person.linkedinLink
            }
            onChange={(e) => setLinkendIn(e.target.value)}
          />
        </div>
        <div className="file flex flex-column">
          <label htmlFor="file" className="form_label">
            Image
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="bio w100 flex flex-column">
          <label htmlFor="bio" className="form_label">
            Biographie
          </label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="w100"
            defaultValue={bio ? bio : person?.biographie}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <div className="submit-btn">
          <input
            type="submit"
            className="sub_btn"
            value="Modifier"
            onClick={handleSubmit}
          />
          <span
            className="cancel_btn c_pointer"
            onClick={(edit) => setIsEdit(!edit)}
          >
            Annuler
          </span>
        </div>
        <div className="formMessage">
          {showMessage && formSuccess && (
            <ForrmSuccessMessage message="Nouveau collaborateur ajouté" />
          )}
          {showMessage && !formSuccess && (
            <FormErrorMessage message={"Une erreur s'est produite !"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdatePerson;
