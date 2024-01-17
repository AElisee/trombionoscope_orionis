import React, { useEffect, useState } from "react";
import "./navBar.scss";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncDirection,
  getAllDirections,
} from "../../redux/direction.slice";

const NavBar = () => {
  const dispatch = useDispatch();
  const allDirections = useSelector(getAllDirections);
  const { directionId } = useParams();

  useEffect(() => {
    dispatch(fetchAsyncDirection());
  }, []);

  return (
    <div className="navBar">
      <ul className="navLink-ctn flex flex-center">
        <li className={`link ${(nav) => (nav.isActive ? "active" : "")}`}>
          <NavLink to="/" className={"dark-teal"}>
            Tous
          </NavLink>
        </li>
        {allDirections &&
          allDirections.map((dir) => (
            <li
              key={dir.id}
              className={`link ${(nav) => (nav.isActive ? "active" : "")}`}
            >
              <NavLink to={`/direction/${dir.id}`} className={"dark-teal"}>
                {dir.nom}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NavBar;
