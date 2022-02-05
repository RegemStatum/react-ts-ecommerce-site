import React, { FC } from "react";
import CloseSidebarLink from "../CloseSidebarLink";

const ShopSubLinks: FC = () => {
  return (
    <div className="sublinks">
      <CloseSidebarLink to="/" name="Product" />
      <CloseSidebarLink to="/products" name="Products" />
      <CloseSidebarLink to="/err" name="Contact" />
      <CloseSidebarLink to="/err" name="Phone" />
      <CloseSidebarLink to="/1" name="Email" />
    </div>
  );
};

export default ShopSubLinks;
