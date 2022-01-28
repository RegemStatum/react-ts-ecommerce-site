import React, { FC } from "react";

interface LinkFalldownPropsType {
  children: React.ReactNode;
  name: string;
}

const LinkFalldown: FC<LinkFalldownPropsType> = ({ children, name }) => {
  return (
    <div className="link-falldown">
      <div className="name">
        <a
          className="link-name"
          href="/"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {name}
        </a>
      </div>
      <div className="sublinks-container">
        <div className="caret"></div>
        {children}
      </div>
    </div>
  );
};

export default LinkFalldown;
