import React from "react";
import CloseSidebarLink from "./CloseSidebarLink";
import { RiShoppingBagLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";

const LoginSignup = () => {
  return (
    <div className="login-signup">
      <CloseSidebarLink to="" name="Log in / Sign up"></CloseSidebarLink>
      <div className="shop-cart-container">
        <CloseSidebarLink to="">
          <div className="shop-cart">
            <RiShoppingBagLine />
            <div className="circle">
              <span>2</span>
            </div>
          </div>
        </CloseSidebarLink>
        <BiSearch />
      </div>
    </div>
  );
};

export default LoginSignup;
