import React, { FC } from "react";
import CloseSidebarLink from "./CloseSidebarLink";
import LinkFalldown from "./LinkFalldown";
import HomeSubLinks from "./sublinks/HomeSubLinks";
import ShopSubLinks from "./sublinks/ShopSubLinks";

const NavLinks: FC = () => {
  return (
    <nav className="nav-links">
      <LinkFalldown name="Home">
        <HomeSubLinks />
      </LinkFalldown>
      <LinkFalldown name="Shop">
        <ShopSubLinks />
      </LinkFalldown>
      <CloseSidebarLink to="" name="About" />
      <CloseSidebarLink to="" name="Contact" />
    </nav>
  );
};

export default NavLinks;
