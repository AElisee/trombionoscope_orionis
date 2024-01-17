import React from "react";
import { baseUrl } from "../../utils/apiUrl";

const Card = ({ employee }) => {
  return (
    <div className="card">
      <div className="img-ctn flex-center">
        <img
          src={
            employee?.photo
              ? `${baseUrl}${employee.photo}`
              : "/images/default-image.jpg"
          }
          alt={employee?.nom}
        />
      </div>
      <div className="txt-ctn">
        <h3 className="name text-teal">
          {employee.nom} {employee.prenoms}
        </h3>
        <h5 className="title text-darkteal text-uppercase">
          {employee.poste?.title}
        </h5>
      </div>
    </div>
  );
};

export default Card;
