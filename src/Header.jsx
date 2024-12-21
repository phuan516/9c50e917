import React from "react";
import { FaSearch, FaBars } from "react-icons/fa";

import "./css/header.css";

const Header = () => {
  return (
    <header>
      <h1>aircall</h1>
      <div className="icons">
        <FaSearch size={20} className="search" />
        <FaBars size={20} className="menu" />
      </div>
    </header>
  );
};

export default Header;
