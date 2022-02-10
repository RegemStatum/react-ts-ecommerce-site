import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import { appReducerActions } from "../../../types/appReducer";

interface CloseSidebarLinkPropsType {
  children?: React.ReactNode;
  name?: string;
  to: string;
}

const CloseSidebarLink: FC<CloseSidebarLinkPropsType> = ({
  children,
  name,
  to,
}) => {
  const { dispatch } = useAppContext();

  return (
    <Link
      to={to}
      onClick={() => {
        dispatch({ type: appReducerActions.CLOSE_SIDEBAR });
      }}
    >
      {name}
      {children}
    </Link>
  );
};

export default CloseSidebarLink;
