import React, { FC } from "react";
import { useAppContext } from "../context/AppContext";
import appContextValueType from "../types/appContextValue";
import { Hero } from "../components/pages/home";

const HomePage: FC = () => {
  return (
    <>
      <div className="container">
        <Hero />
      </div>
    </>
  );
};

export default HomePage;
