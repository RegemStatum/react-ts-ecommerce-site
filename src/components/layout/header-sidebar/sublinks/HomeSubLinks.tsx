import React, { FC } from "react";
import CloseSidebarLink from "../CloseSidebarLink";

const HomeSubLinks: FC = () => {
  return (
    <div className="sublinks">
      <CloseSidebarLink to="/" name="Home" />
      <CloseSidebarLink to="/products" name="Products" />
      <CloseSidebarLink to="/cart" name="Cart" />
      <CloseSidebarLink to="/login" name="Login" />
    </div>
  );
};

export default HomeSubLinks;
