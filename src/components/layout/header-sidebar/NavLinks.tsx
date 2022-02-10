import React, { FC } from "react";
import CloseSidebarLink from "./CloseSidebarLink";
import LinkFalldown from "./LinkFalldown";
import HomeSubLinks from "./sublinks/HomeSubLinks";
import ShopSubLinks from "./sublinks/ShopSubLinks";
// images for falldown links
import HomeLinkFalldownImg from "../../../assets/images/index/webp/suits-img.webp";
import ShopLinkFalldownImg from "../../../assets/images/index/webp/scarves-img.webp";

const NavLinks: FC = () => {
  return (
    <nav className="nav-links">
      <LinkFalldown name="Home" img={HomeLinkFalldownImg}>
        <HomeSubLinks />
      </LinkFalldown>
      <LinkFalldown name="Shop" img={ShopLinkFalldownImg}>
        <ShopSubLinks />
      </LinkFalldown>
      <CloseSidebarLink to="" name="About" />
      <CloseSidebarLink to="" name="Contact" />
    </nav>
  );
};

export default NavLinks;
