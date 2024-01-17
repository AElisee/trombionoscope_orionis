import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import NavBar from "../../components/navBar/NavBar";
import SearchComponent from "../../components/search/SearchComponent";
import Footer from "../../components/footer/Footer";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncEmployees,
  getAllEmployees,
} from "../../redux/employee.Slice";
import GoBack from "../../components/goback/GoBack";
import Heading from "../../components/header/Heading";
import { baseUrl } from "../../utils/apiUrl";
import {
  fetchAsyncDirection,
  getAllDirections,
} from "../../redux/direction.slice";
import {
  fetchAsyncDirectors,
  getAllDirectors,
} from "../../redux/directors.Slice";
import {
  fetchAsyncthisDirEmployees,
  getDirEmployees,
} from "../../redux/thisDirectionEmployees.slice";

const DirectionsPage = () => {
  const employeesData = useSelector(getAllEmployees);
  const dirEmployeesData = useSelector(getDirEmployees);
  const { directionId } = useParams();
  const allDirections = useSelector(getAllDirections);
  const allDirectors = useSelector(getAllDirectors);
  const dispatch = useDispatch();

  const thisdirection = allDirections
    .filter((dir) => parseInt(dir.id) === parseInt(directionId))
    .map((thisdir) => thisdir.nom);

  // trouver le directeur de la direction
  const thisDirector = allDirectors?.find(
    (director) => parseInt(director.direction.id) == parseInt(directionId)
  );

  const searchCollaborator = employeesData?.find(
    (collaborateur) =>
      parseInt(collaborateur?.id) === parseInt(thisDirector?.collaborateur?.id)
  );

  useEffect(() => {
    dispatch(fetchAsyncthisDirEmployees(directionId));
    dispatch(fetchAsyncEmployees());
    dispatch(fetchAsyncDirection());
    dispatch(fetchAsyncDirectors());
  }, [directionId]);

  return (
    <div className="general-dir">
      <Header />
      <GoBack activePage={thisdirection} />
      <Heading />
      <NavBar />
      <SearchComponent data={dirEmployeesData} />
      <div className="allEmployees">
        {/* afficher le directeur de la direction */}
        {thisDirector && (
          <div className="card-container">
            <Link to={`/details/${thisDirector?.collaborateur.id}`}>
              <div className="card">
                <div className="img-ctn flex-center">
                  <img
                    src={
                      thisDirector?.collaborateur.photo
                        ? `${baseUrl}${thisDirector.collaborateur.photo}`
                        : "/images/default-image.jpg"
                    }
                    alt={`image de ${thisDirector?.collaborateur?.nom}`}
                  />
                </div>
                <div className="txt-ctn">
                  <h3 className="name text-teal">
                    {thisDirector?.collaborateur.nom}{" "}
                    {thisDirector?.collaborateur.prenoms}
                  </h3>
                  <h5 className="title text-darkteal text-uppercase">
                    {searchCollaborator?.poste?.title}
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        )}
        {/* -------- */}
        {[5, 4].map((grade) => (
          <div key={grade} className="card-container">
            {dirEmployeesData
              .slice()
              .sort((a, b) => b.grade - a.grade)
              .filter((employee) => parseInt(employee.grade) === grade)
              .map((employee) => (
                <Link to={`/details/${employee.id}`} key={employee.id}>
                  <Card employee={employee} />
                </Link>
              ))}
          </div>
        ))}
        <div className="card-container">
          {dirEmployeesData
            .slice()
            .sort((a, b) => b.grade - a.grade)
            .filter((employe) => employe.grade < 4)
            .map((employee) => (
              <Link to={`/details/${employee.id}`} key={employee.id}>
                <Card employee={employee} />
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DirectionsPage;
