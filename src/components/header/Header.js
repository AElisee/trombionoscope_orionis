import React from "react";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-bg flex flex-center">
        <div className="img-ctn flex flex-center">
          <img src="/images/logo.png" alt="" />
        </div>
      </div>
      <div>
        <h1 className="bg-teal">Trombinoscope</h1>
      </div>
    </div>
  );
};

export default Header;
