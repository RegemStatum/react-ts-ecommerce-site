import React, { FC } from "react";
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {
  return (
    <div className="error-page page-min-height">
      <span>Page Not Found</span>
      <span>404</span>
      <Link to="/" className="back-link">
        Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
