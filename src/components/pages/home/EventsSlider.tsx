import React, { FC, useState, useRef, useEffect } from "react";
//events
import sliderInfoArr from "../../../utils/constants/events-slider";

const EventsSlider: FC = () => {
  const [curId, setCurId] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const eventContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eventContainerRef) {
      const eventContainerWidth = eventContainerRef.current!.offsetWidth;
      const newTranslate = -(curId * eventContainerWidth);
      setTranslateX(newTranslate);
    }
  }, [curId]);

  return (
    <section className="events-slider container-2" ref={eventContainerRef}>
      <div
        className="inner-container"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {sliderInfoArr.map((info) => {
          return (
            <div className="info" key={info.id}>
              <h4>event</h4>
              <h3>{info.eventName}</h3>
              <p>{info.date}</p>
            </div>
          );
        })}
      </div>
      <div className="control-markers">
        {sliderInfoArr.map((marker) => {
          const id = marker.id - 1;
          return (
            <button
              key={marker.id}
              className={`marker ${curId === id ? "highlighted" : ""}`}
              onClick={() => {
                setCurId(id);
              }}
            ></button>
          );
        })}
      </div>
    </section>
  );
};

export default EventsSlider;
