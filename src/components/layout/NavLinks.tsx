import React from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <nav>
      <Link to="">Home</Link>
      <Link to="/products">Shop</Link>
      <Link to="">About</Link>
      <Link to="">Contact</Link>
    </nav>
  );
};

export default NavLinks;
