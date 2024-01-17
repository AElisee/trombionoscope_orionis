import React from "react";
import { NavLink } from "react-router-dom";

const Widget = ({ title, data, page }) => {
  return (
    <NavLink to={page} className="widget main-shadow">
      <div className="left">
        <h4 className="title font-11">{title}</h4>
        <p className="total font-10">{data?.length}</p>
        <p className="more">Voir les détails</p>
      </div>
    </NavLink>
  );
};

export default Widget;
