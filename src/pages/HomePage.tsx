import React, { FC } from "react";
import { useAppContext } from "../context/AppContext";
import appContextValueType from "../types/appContextValue";
import { Hero, Pros } from "../components/pages/home";

const HomePage: FC = () => {
  return (
    <main>
      <Hero />
      <Pros />
    </main>
  );
};

export default HomePage;
