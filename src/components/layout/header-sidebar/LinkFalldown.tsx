import React, { FC } from "react";

interface LinkFalldownPropsType {
  children: React.ReactNode;
  name: string;
  img?: string;
}

const LinkFalldown: FC<LinkFalldownPropsType> = ({ children, name, img }) => {
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
        {children}
        {img && (
          <div className="img-container">
            <img src={img} alt="falldown" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkFalldown;
