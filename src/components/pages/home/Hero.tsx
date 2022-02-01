import React, { FC, useState } from "react";
import heroimg from "../../../assets/images/index/hero-image.png";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
// slider text content
import textArr from "../../../utils/constants/hero-slider";

const Hero: FC = () => {
  const [sliderIds, setSliderIds] = useState({ curId: 2, prevId: 1 });

  const handleNextBtnClick = () => {
    console.log("click");
    let newCurId = sliderIds.curId + 1;
    if (newCurId > textArr.length) {
      newCurId = 1;
    }
    setSliderIds({ ...sliderIds, prevId: sliderIds.curId, curId: newCurId });
  };

  const handlePrevBtnClick = () => {
    console.log("click");
    let newCurId = sliderIds.curId - 1;
    if (newCurId < 1) {
      newCurId = textArr.length;
    }
    setSliderIds({ ...sliderIds, prevId: sliderIds.curId, curId: newCurId });
  };

  function log() {
    console.log("btn click");
  }

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
                    sliderIds.curId === id
                      ? "cur"
                      : sliderIds.prevId === id
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
                    sliderIds.curId === id
                      ? "cur"
                      : sliderIds.prevId === id
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
