import React, { useState, useEffect } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import test1 from "/test1.jpg";
import test2 from "/test2.jpg";
import test3 from "/test3.jpg";

let slides = [test1, test2, test3];

export default function CarouselDefault() {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-1/2 h-1/2 mt-14 rounded-2xl">
        <div className="overflow-hidden relative rounded-2xl">
          <div
            className={`flex transition ease-out duration-40`}
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((s) => {
              return <img src={s} />;
            })}
          </div>
          <div className="absolute top-0 h-full w-full justify-between  items-center flex text-stone-300 px-10 text-4xl">
            <button onClick={previousSlide} className="hover:text-stone-50">
              <FaArrowCircleLeft />
            </button>
            <button onClick={nextSlide} className="hover:text-stone-50">
              <FaArrowCircleRight />
            </button>
          </div>

          <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full ">
            {slides.map((s, i) => {
              return (
                <div
                  onClick={() => {
                    setCurrent(i);
                  }}
                  key={"circle" + i}
                  className={`rounded-full w-5 h-5 cursor-pointer ${
                    i == current ? "bg-stone-500" : "bg-stone-50"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
