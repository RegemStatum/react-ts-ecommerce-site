import React, { FC } from "react";
import pros from "../../../utils/constants/index-pros";

const Pros: FC = () => {
  return (
    <section className="pros container-2">
      {pros.map((item) => {
        const { name, description, icon, id } = item;
        return (
          <div className="pros-item" key={id}>
            <div className="icon">{icon}</div>
            <div className="name-description">
              <p className="name">{name}</p>
              <p className="description">{description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Pros;
