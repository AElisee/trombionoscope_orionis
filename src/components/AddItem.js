import React from "react";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const AddItem = ({ link }) => {
  return (
    <div className="addItem flex flex-aic flex-jcc c_pointer">
      <AddIcon className="add-btn" />
      <NavLink to={link} className="font-11">
        Ajouter
      </NavLink>
    </div>
  );
};

export default AddItem;
