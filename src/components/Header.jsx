import React from "react";
import { FaSearch, FaBars } from "react-icons/fa";

import "../css/header.css";

const Header = () => {
  return (
    <header>
      <h1>aircall</h1>
      <div className="icons">
        <div className="search-icon">
          <FaSearch size={20} className="search" />
        </div>
        <div className="menu-icon">
          <FaBars size={20} className="menu" />
        </div>
      </div>
    </header>
  );
};

export default Header;
