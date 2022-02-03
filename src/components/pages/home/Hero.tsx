import React, { FC, useState } from "react";
import heroimg from "../../../assets/images/index/hero-image.png";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
// slider text content
import textArr from "../../../utils/constants/hero-slider";

const Hero: FC = () => {
  const [curId, setCurId] = useState(2);

  const handleNextBtnClick = () => {
    let newCurId = curId + 1;
    if (newCurId > textArr.length) {
      newCurId = 1;
    }
    setCurId(newCurId);
  };

  const handlePrevBtnClick = () => {
    let newCurId = curId - 1;
    if (newCurId < 1) {
      newCurId = textArr.length;
    }
    setCurId(newCurId);
  };

  return (
    <section className="hero">
      <div className="hero-slider">
        <div className="container">
          <button
            type="button"
            onClick={handlePrevBtnClick}
            className="hero-slider-arrow-left"
          >
            <BsArrowLeft />
          </button>
          <div className="hero-slider-inner-container">
            {textArr.map((text) => {
              const { backText, id } = text;
              return (
                <div
                  className={`hero-slider-content-bg ${
                    curId === id
                      ? "cur"
                      : curId - 1 === id ||
                        (curId === 1 && id === textArr.length)
                      ? "prev"
                      : "next"
                  }`}
                  key={id}
                >
                  <span className="hero-bg-text">{backText}</span>
                </div>
              );
            })}
            <img src={heroimg} alt="hero fashion" className="hero-img" />
            {textArr.map((text) => {
              const { frontText, btnText, id } = text;
              return (
                <div
                  className={`hero-slider-content ${
                    curId === id
                      ? "cur"
                      : curId - 1 === id ||
                        (curId === 1 && id === textArr.length)
                      ? "prev"
                      : "next"
                  }`}
                  key={id}
                >
                  <span className="hero-front-text">{frontText}</span>
                  <a href="/" className="hero-btn">
                    {btnText}
                  </a>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="hero-slider-arrow-right"
            onClick={handleNextBtnClick}
          >
            <BsArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
