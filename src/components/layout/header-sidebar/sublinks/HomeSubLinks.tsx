import React, { FC } from "react";
import CloseSidebarLink from "../CloseSidebarLink";

const HomeSubLinks: FC = () => {
  return (
    <div className="sublinks">
      <CloseSidebarLink to="" name="Home" />
      <CloseSidebarLink to="/products" name="Products" />
      <CloseSidebarLink to="/contact" name="Contact" />
    </div>
  );
};

export default HomeSubLinks;
