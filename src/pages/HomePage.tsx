import React, { FC } from "react";
import { useAppContext } from "../context/AppContext";
import appContextValueType from "../types/appContextValue";

const HomePage: FC = () => {
  return (
    <>
      <div className="container">
        <h3>Home page</h3>
      </div>
    </>
  );
};

export default HomePage;
