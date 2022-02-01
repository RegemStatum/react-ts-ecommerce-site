import React, { FC } from "react";
import LoginSignup from "./LoginSignup";
// logo
import logo from "../../../assets/images/layout/header-logo.svg";
// navigation
import NavLinks from "./NavLinks";
// react icons
import { AiOutlineMenu } from "react-icons/ai";
// router links
import { Link } from "react-router-dom";
// context
import { useAppContext } from "../../../context/AppContext";
// reducer actions
import { appReducerActions } from "../../../types/appReducer";

const Header: FC = () => {
  const { dispatch } = useAppContext();

  return (
    <header className="header">
      <div className="container">
        <div className="header-logo">
          <Link to="">
            <img src={logo} alt="be-pro" />
          </Link>
        </div>
        <div className="header-links">
          <NavLinks />
        </div>
        <LoginSignup />
        <button
          className="mobile-menu"
          onClick={() =>
            dispatch({
              type: appReducerActions.OPEN_SIDEBAR,
            })
          }
        >
          <AiOutlineMenu />
        </button>
      </div>
    </header>
  );
};

export default Header;
