import React, { FC, useState, useRef, useEffect } from "react";
import imagesArr from "../utils/constants/companies-slider";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const CompaniesSlider: FC = () => {
  const IMAGES_AMOUNT = imagesArr.length;
  const IMAGES_PER_SCREEN = 4;
  const [sliderSkipId, setSliderSkipId] = useState(0);
  const [skipLength, setSkipLength] = useState(0);
  const [isBack, setIsBack] = useState(false);
  const imageContainer = useRef<HTMLDivElement>(null);

  const handleNextClick = () => {
    setSliderSkipId((prev) => {
      if (prev + 1 > IMAGES_AMOUNT - IMAGES_PER_SCREEN) {
        return prev;
      } else {
        return prev + 1;
      }
    });
    setSkipLength((prev) => prev - imageContainer.current!.offsetWidth);
  };

  const handlePrevClick = () => {
    setSliderSkipId((prev) => {
      if (prev - 1 < 1) {
        return 0;
      } else {
        return prev - 1;
      }
    });
    setSkipLength((prev) => prev + imageContainer.current!.offsetWidth);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      if (sliderSkipId === IMAGES_AMOUNT - IMAGES_PER_SCREEN - 1 && !isBack) {
        setIsBack(true);
      }
      if (sliderSkipId < 2) {
        setIsBack(false);
      }

      if (!isBack && sliderSkipId < IMAGES_AMOUNT - IMAGES_PER_SCREEN) {
        handleNextClick();
      } else if (sliderSkipId > 0) {
        handlePrevClick();
      }
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <section className="companies-slider container-2">
      <button
        type="button"
        className={`control-btn ${sliderSkipId === 0 ? "hide" : ""}`}
        onClick={handlePrevClick}
      >
        <IoIosArrowBack />
      </button>
      <div
        className="inner-container"
        style={{ transform: `translateX(${skipLength}px)` }}
      >
        {imagesArr.map((item) => {
          return (
            <div key={item.id} className={`img-container`} ref={imageContainer}>
              <img src={item.img} alt="partner-company" />
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className={`control-btn ${
          sliderSkipId === IMAGES_AMOUNT - IMAGES_PER_SCREEN ? "hide" : ""
        }`}
        onClick={handleNextClick}
      >
        <IoIosArrowForward />
      </button>
    </section>
  );
};

export default CompaniesSlider;
