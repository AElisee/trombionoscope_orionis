import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sideBar">
      <div className="logo-ctn flex flex-center">
        <img src="/images/logo_orionis.png" alt="log-orionis" />
      </div>
      <div className="dashboard">
        <div className="dashboard-ctn">
          <h5 id="menu">menu</h5>
          <ul className="links-ctn">
            <NavLink
              to="/"
              className={`navlink ${(nav) => (nav.isActive ? "active" : "")}`}
            >
              Tableau de bord
            </NavLink>

            <li>
              <NavLink
                to={"/direction"}
                className={`navlink ${(nav) => (nav.isActive ? "active" : "")}`}
              >
                Directions
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/departement"}
                className={`navlink ${(nav) => (nav.isActive ? "active" : "")}`}
              >
                Départements
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/service"}
                className={`navlink ${(nav) => (nav.isActive ? "active" : "")}`}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/poste"}
                className={`navlink ${(nav) => (nav.isActive ? "active" : "")}`}
              >
                Postes
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/collaborateur"}
                className={`navlink ${(nav) => (nav.isActive ? "active" : "")}`}
              >
                Collaborateurs
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/directeur"}
                className={`navlink ${(nav) => (nav.isActive ? "active" : "")}`}
              >
                Directeurs
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
