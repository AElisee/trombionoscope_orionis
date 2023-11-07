import React from "react";

const Card = ({ employee }) => {
  return (
    <div className="card">
      <div className="img-ctn flex-center">
        <img src={employee.imageUrl} alt="" />
      </div>
      <div className="txt-ctn">
        <h3 className="name text-teal">
          {employee.lastName} {employee.firstName}
        </h3>
        <h5 className="title text-darkteal text-uppercase">Manager</h5>
      </div>
    </div>
  );
};

export default Card;
