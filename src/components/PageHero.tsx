import React, { FC } from "react";
import { Link } from "react-router-dom";
import { VscTriangleRight } from "react-icons/vsc";

interface PageHeroProps {
  path: string;
}

const PageHero: FC<PageHeroProps> = ({ path }) => {
  const pathItems = path
    .split("/")
    .slice(0, -1)
    .filter((item) => item !== "");

  const getPath = (pathId: number) => {
    let returnStr = "";
    for (let i = 0; i <= pathId; i++) {
      returnStr += `/${pathItems[i]}`;
    }
    return returnStr;
  };

  return (
    <section className="page-hero">
      <h4>Lifestyle clothing</h4>
      <p className="path">
        <Link to="/">Home {pathItems.length > 0 && <VscTriangleRight />}</Link>
        {pathItems.map((pathPart, index) => {
          const pathTo = getPath(index);
          return (
            <Link to={pathTo} key={index}>
              {pathPart}
              {index !== pathItems.length - 1 && <VscTriangleRight />}
            </Link>
          );
        })}
      </p>
    </section>
  );
};

export default PageHero;
