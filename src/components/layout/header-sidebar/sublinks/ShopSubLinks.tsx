import React, { FC } from "react";
import CloseSidebarLink from "../CloseSidebarLink";

const ShopSubLinks: FC = () => {
  return (
    <div className="sublinks">
      <CloseSidebarLink to="/" name="Shops" />
      <CloseSidebarLink to="/products" name="Products" />
      <CloseSidebarLink to="/" name="Phone" />
      <CloseSidebarLink to="/" name="Email" />
    </div>
  );
};

export default ShopSubLinks;
