import React, { useState, useEffect } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
// import useCarousel from "../../hooks/useCarousel";
import test1 from "/test1.jpg";
import test2 from "/test2.jpg";
import test3 from "/test3.jpg";
import nophoto from "../../assets/nophoto.jpg";

export default function CarouselDefault() {
  let [current, setCurrent] = useState(0);
  // const [imagedata, Setimagedata] = useState([]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await useCarousel();
  //             Setimagedata(response);
  //         } catch (error) {
  //             console.error('Error:', error);
  //         }
  //     };

  //     fetchData();
  // }, []);

  let slides = [test3,test2,test1];

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
      <div className="w-full h-full rounded-2xl">
        <div className="overflow-hidden relative rounded-2xl">
          {slides.length === 0 ? (
            <div className="flex justify-center items-center w-full h-1/2">
              <img
                src={nophoto}
                className="w-full h-1/2 object-cover"
                style={{ height: "65vh" }}
              />
            </div>
          ) : (
            <>
              <div
                className={`flex transition ease-out duration-40`}
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {slides.map((s) => {
                  return <img role="img" src={s} />;
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
