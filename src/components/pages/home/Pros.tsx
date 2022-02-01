import React, { FC } from "react";
import pros from "../../../utils/constants/index-pros";

const Pros: FC = () => {
  return (
    <section className="pros">
      {pros.map((item) => {
        const { name, description, icon, id } = item;
        return (
          <div className="pros-item" key={id}>
            <div className="icon">{icon}</div>
            <p className="name">{name}</p>
            <p className="description">{description}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Pros;
