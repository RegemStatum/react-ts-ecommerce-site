import React, { FC } from "react";
import { Link } from "react-router-dom";

const FooterLinks: FC = () => {
  return (
    <div className="footer-links">
      <Link to="/">Man</Link>
      <Link to="/">Woman</Link>
      <Link to="/">Lookbook</Link>
      <Link to="/">Sale</Link>
      <Link to="/">Blog</Link>
    </div>
  );
};

export default FooterLinks;
