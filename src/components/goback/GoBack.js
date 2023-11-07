import React from "react";
import { Link } from "react-router-dom";

const GoBack = ({ activePage }) => {
  return (
    <div className="toback flex">
      <Link to={"/"}>Accueil / </Link>
      <span>{activePage}</span>
    </div>
  );
};

export default GoBack;
