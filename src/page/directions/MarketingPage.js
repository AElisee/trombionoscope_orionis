import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import NavBar from "../../components/navBar/NavBar";
import SearchComponent from "../../components/search/SearchComponent";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncEmployees } from "../../redux/employee.Slice";
import GoBack from "../../components/goback/GoBack";
import Heading from "../../components/header/Heading";

const MarketingPage = () => {
  const employeesData = useSelector((state) => state.employees.employeesData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncEmployees());
  }, [dispatch]);
  return (
    <div className="marketing-dir">
      <Header />
      <GoBack activePage={"Direction marketing"} />
      <Heading />
      <NavBar />
      <SearchComponent />
      <div className="allEmployees">
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

export default MarketingPage;
