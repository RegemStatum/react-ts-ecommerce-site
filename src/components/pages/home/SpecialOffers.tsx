import React, { FC } from "react";
import suitImg from "../../../assets/images/index/webp/suits-img.webp";
import scarvesImg from "../../../assets/images/index/webp/scarves-img.webp";

const SpecialOffers: FC = () => {
  return (
    <section className="special-offers container-2">
      <div className="special-offer special-offer-1">
        <div className="info">
          <h5>suits</h5>
          <h4>
            Slim Fit Prince of <br></br>Wales Check Wool
          </h4>
          <p>• 2,295.00 USD</p>
        </div>
        <img src={suitImg} alt="suit" />
      </div>
      <div className="special-offer special-offer-2">
        <div className="info">
          <h5>scarves</h5>
          <h4>
            Lightweight check<br></br> wool cashmere scarf
          </h4>
          <p>• 425.00 USD</p>
        </div>
        <img src={scarvesImg} alt="suit" />
      </div>
    </section>
  );
};

export default SpecialOffers;
