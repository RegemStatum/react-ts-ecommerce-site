import React, { FC, useState } from "react";
import CloseSidebarLink from "./CloseSidebarLink";
import { RiShoppingBagLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";

const LoginSignup: FC = () => {
  const { user, isAuthenticated } = useAuth0();
  const isUser = user && isAuthenticated;
  const [userName, setUserName] = useState("");

  // set user name
  if (isUser && userName === "") {
    let userName = user.name;
    if (userName!.length > 1) {
      userName = userName!.split(" ")[0];
    }
    setUserName(userName!);
  }

  return (
    <div className="login-signup">
      <CloseSidebarLink
        to="/login"
        name={`${!isUser ? "Log in / Sign up" : `Welcome, ${userName}`} `}
      ></CloseSidebarLink>
      <div className="shop-cart-container">
        <CloseSidebarLink to="/cart">
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
