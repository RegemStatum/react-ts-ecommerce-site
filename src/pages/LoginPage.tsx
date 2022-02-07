import React, { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageHero from "../components/PageHero";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import PopularProducts from "../components/PopularProducts";

const LoginPage: FC = () => {
  const path = useLocation().pathname;
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const isUser = user && isAuthenticated;
  // return to login page after log out
  const returnTo = `${window.location.origin}/login`;

  return (
    <section className="login-page page-min-height">
      <PageHero path={path} />
      {isUser && (
        <>
          <div className="user-info container-2">
            <img src={user.picture} alt={user.name} />
            <div className="email-info">
              <h4 className="name">{user.name}</h4>
              {user.email && <p className="email">{user.email}</p>}
            </div>
          </div>
          <div className="cart-products-refs container-2">
            <Link to="/cart">Go to cart</Link>
            <Link to="/products">Go to products page</Link>
            <button
              onClick={() => logout({ returnTo: returnTo })}
              className="logout"
            >
              Log Out
            </button>
          </div>
        </>
      )}
      {isUser && <PopularProducts />}
      <div className="login-btn-container container-2">
        {!isUser && (
          <>
            <h4>Please, login to make an order</h4>
            <button onClick={() => loginWithRedirect()} className="login">
              Log In
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default LoginPage;
