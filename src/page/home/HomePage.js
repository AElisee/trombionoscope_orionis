import React, { useEffect } from "react";
import NavBar from "../../components/navBar/NavBar";
import "./home.scss";
import Header from "../../components/header/Header";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { fetchAsyncEmployees } from "../../redux/employee.Slice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import SearchComponent from "../../components/search/SearchComponent";
import Heading from "../../components/header/Heading";

const HomePage = () => {
  const employeesData = useSelector((state) => state.employees.employeesData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncEmployees());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <div className="homePage">
      <Header />
      <Heading />
      <NavBar />
      <SearchComponent />

      {/* section directeurs */}
      <div className="allEmployees">
        <h3 className="section-title">Tous les collaborateurs</h3>
        <div className="card-container">
          {employeesData.map((employee) => (
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

export default HomePage;
