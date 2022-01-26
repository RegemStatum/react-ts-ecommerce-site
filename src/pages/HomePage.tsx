import React, { FC } from "react";
import { useAppContext } from "../context/AppContext";
import appContextValueType from "../types/appContextValue";

const HomePage: FC = () => {
  const { name }: appContextValueType = useAppContext();

  return (
    <>
      <div className="container" style={{ backgroundColor: "red" }}>
        <h2>Home page: {name}</h2>
      </div>
    </>
  );
};

export default HomePage;
