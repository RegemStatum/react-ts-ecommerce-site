import React, { FC } from "react";
import { useAppContext } from "../../../context/AppContext";
import NavLinks from "./NavLinks";
import { AiFillCloseSquare } from "react-icons/ai";
import { appReducerActions } from "../../../types/appReducer";
import LoginSignup from "./LoginSignup";

const Sidebar: FC = () => {
  const {
    state: { isSidebarOpen },
    dispatch,
  } = useAppContext();

  return (
    <aside className={`sidebar-container ${isSidebarOpen ? "show" : "hide"}`}>
      <div className="sidebar">
        <NavLinks />
        <AiFillCloseSquare
          className="close-btn"
          onClick={() => {
            dispatch({ type: appReducerActions.CLOSE_SIDEBAR });
          }}
        />
        <LoginSignup />
      </div>
    </aside>
  );
};

export default Sidebar;
