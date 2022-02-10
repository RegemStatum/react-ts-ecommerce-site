import React, { FC } from "react";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterSubscribe from "./FooterSubscribe";
//logo
import logo from "../../../assets/images/layout/footer-logo.svg";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo-social">
          <img src={logo} alt="modax" className="footer-logo" />
          <FooterSocialLinks />
        </div>
        <div className="footer-links-subscribe">
          <FooterLinks />
          <FooterSubscribe />
        </div>

        <FooterContact />
      </div>
    </footer>
  );
};

export default Footer;
