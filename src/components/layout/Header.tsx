import React, { FC } from "react";
// logo
import logo from "../../assets/images/layout/header-logo.png";
// navigation
import NavLinks from "./NavLinks";
// react icons
import { AiOutlineMenu } from "react-icons/ai";
import { RiShoppingBagLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
// router links
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <Link to="">
            <img src={logo} alt="be-pro" />
          </Link>
        </div>
        <div className="header-links">
          <NavLinks />
        </div>
        <div className="login-signup">
          <Link to="">Log in / Sign up</Link>
          <div className="shop-cart-container">
            <Link to="" className="shop-cart">
              <RiShoppingBagLine />
              <div className="circle">
                <span>2</span>
              </div>
            </Link>
            <BiSearch />
          </div>
        </div>
        <div className="mobile-menu">
          <AiOutlineMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
