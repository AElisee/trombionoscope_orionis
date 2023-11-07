import React from "react";
import "./navBar.scss";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navBar">
      <ul className="navLink-ctn flex flex-center">
        <li className={`link ${(nav) => (nav.isActive ? "active" : "")}`}>
          <NavLink to={"/direction-generale"} className={"dark-teal"}>
            Direction générale
          </NavLink>
        </li>
        <li className="link">
          <NavLink to={"/direction-operations"} className={"dark-teal"}>
            Direction des opérations
          </NavLink>
        </li>
        <li className="link">
          <NavLink
            to={"/direction-systeme-information"}
            className={"dark-teal"}
          >
            Direction système info
          </NavLink>
        </li>
        <li className="link">
          <NavLink to={"/direction-marketing"} className={"dark-teal"}>
            Direction marketing
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
