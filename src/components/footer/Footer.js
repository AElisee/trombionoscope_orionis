import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="flex flex-center">
      <p>Copyright © {` ${new Date().getFullYear()} `} ORIONIS CI</p>
    </footer>
  );
};

export default Footer;
