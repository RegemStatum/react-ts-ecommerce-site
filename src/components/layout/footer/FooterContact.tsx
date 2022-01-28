import React, { FC } from "react";
// payment cards images
import VisaPaymentCard from "../../../assets/images/layout/cards/visa.png";
import PaypalPaymentCard from "../../../assets/images/layout/cards/paypal.png";
import Mastercard1PaymentCard from "../../../assets/images/layout/cards/mastercard-1.png";
import Mastercard2PaymentCard from "../../../assets/images/layout/cards/mastercard-2.png";
import AmePaymentCard from "../../../assets/images/layout/cards/ame.png";

const FooterContact: FC = () => {
  return (
    <div className="footer-contact">
      <h5>Contact Us</h5>
      <p>
        San Francisco, California <br />
        400 Castro St, San Francisco, CA
      </p>
      <a href="tel:+74951234567">(+1) 686-868-9999</a>
      <div className="payment-cards">
        <img
          className="payment-card"
          src={VisaPaymentCard}
          alt="payment card visa"
        />
        <img
          className="payment-card"
          src={PaypalPaymentCard}
          alt="payment card paypal"
        />
        <img
          className="payment-card"
          src={Mastercard1PaymentCard}
          alt="payment card mastercard"
        />
        <img
          className="payment-card"
          src={Mastercard2PaymentCard}
          alt="payment card mastercard"
        />
        <img
          className="payment-card"
          src={AmePaymentCard}
          alt="payment card ame"
        />
      </div>
    </div>
  );
};

export default FooterContact;
