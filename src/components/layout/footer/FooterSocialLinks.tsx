import React, { FC } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import {
  AiOutlineTwitter,
  AiOutlineBehance,
  AiOutlineDribbble,
} from "react-icons/ai";

const FooterSocialLinks: FC = () => {
  return (
    <div className="footer-social-links">
      <a href="/">
        <FaFacebookF />
      </a>
      <a href="/">
        <AiOutlineTwitter />
      </a>
      <a href="/">
        <AiOutlineBehance />
      </a>
      <a href="/">
        <AiOutlineDribbble />
      </a>
      <a href="/">
        <FaLinkedinIn />
      </a>
    </div>
  );
};

export default FooterSocialLinks;
