import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./singleEmployee.scss";
import { fetchAsyncEmployees } from "../../redux/employee.Slice";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Card from "../../components/card/Card";
import GoBack from "../../components/goback/GoBack";
import { baseUrl } from "../../utils/apiUrl";

const SingeEmployee = () => {
  const employeesData = useSelector((state) => state.employees.employeesData);
  const dispatch = useDispatch();

  const { id } = useParams();
  const employee = employeesData?.find((emp) => emp.id === parseInt(id, 10));

  useEffect(() => {
    dispatch(fetchAsyncEmployees());
    window.scrollTo(0, 0);
  }, [dispatch]);

  // console.log(employeesData);

  return (
    <div className="singleEmployee">
      <Header />
      <GoBack activePage={"détails employé"} />
      <div className="details" id="tp">
        <div className="more-details">
          <div className="pic flex flex-center">
            <div className="img-ctn flex flex-center">
              <img
                src={
                  employee?.photo
                    ? `${baseUrl}${employee.photo}`
                    : "/images/default-image.jpg"
                }
                alt={employee?.nom}
              />
            </div>
            <h3 className="name">
              {employee?.prenoms} {employee?.nom}
            </h3>
          </div>
          <div className="address">
            <h5 className="position text-uppercase dark-teal">
              {employee?.poste.title}
            </h5>
            <div className="desc">
              <h5 className="text-teal">Description/Bio:</h5>
              <p>{employee?.biographie}</p>
            </div>
            <h5 className="flex">
              <img src="/icons/device-landline-phone.svg" alt="" />
              <span>{employee?.telephone_fixe}</span>
            </h5>
            <h5 className="flex">
              <img src="/icons/device-mobile.svg" alt="" />
              <span>{employee?.telephone_portable}</span>
            </h5>
            <h5 className="flex">
              <img src="/icons/mail.svg" alt="" />
              <span>{employee?.email}</span>
            </h5>
            <div className="social-netWork flex flex-center">
              <Link to={""}>
                <img src="/icons/brand-instagram.svg" alt="" />
              </Link>
              <Link to={""}>
                <img src="/icons/brand-linkedin.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* LA LOGIQUE D'AFFICHAGE D'AUTRE COLLABORATEURS A REVOIR */}
      {/* <div className="members">
        <h2 className="dark-teal">Autres membres de la direction</h2>
        <hr className="bg-teal" />
        <ul className="card-container">
          {employeesData &&
            employeesData.slice(10, 14).map((employee) => (
              <Link
                to={`/details/${employee.id}`}
                key={employee.id}
                onClick={() => window.scrollTo(0, 0)}
              >
                <Card employee={employee} />
              </Link>
            ))}
        </ul>
      </div> */}
      <Footer />
    </div>
  );
};

export default SingeEmployee;
