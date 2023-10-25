import React,{useEffect} from "react";

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons';

import img1 from "../../assets/images/banner-01.jpg";
import img2 from "../../assets/images/banner-02.jpg";
import img3 from "../../assets/images/banner-03.jpg";
import img4 from "../../assets/images/banner-04.jpg";

import "./Slider.css"



const Slider = () => {
  useEffect(() => {
    var swiper = new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      spaceBetween: 30,
      centeredSlides: false,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 1,
        slideShadows: false
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      keyboard: {
        enabled: true
      },
      mousewheel: {
        thresholdDelta: 70
      },
      breakpoints: {
        460: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 3
        },
        1024: {
          slidesPerView: 3
        },
        1600: {
          slidesPerView: 3.6
        }
      }
    });
  }, []);

  return (
    <div class="Slider">
    <div class="content">
      <h2>Welcome to TrekDestiny</h2>
      <p>Embark on an extraordinary adventure with us as we take you to every corner of the world</p>
      <ul class="counter">
        <li>
          <h3><FontAwesomeIcon icon={faBook} /> 68+k</h3>
          <span>book collections</span>
        </li>
        <li>
          <h3><FontAwesomeIcon icon={faUser} /> 25,634</h3>
          <span>customers</span>
        </li>
      </ul>
      <button class="btn">Go to Collections <i class="fa-solid fa-arrow-right"></i></button>
    </div>

  <div class="swiper-container">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-slide--one">

          <span>best city</span>
          <div class="slide-content">
            <h3>Tehran</h3>

          </div>
        </div>
        <div class="swiper-slide swiper-slide--two">
          <span>best city</span>
          <div class="slide-content">
            <h3>Isfahan</h3>

          </div>

        </div>
        <div class="swiper-slide swiper-slide--three">
          <span>best city</span>
          <div class="slide-content">
            <h3>NewYork</h3>

          </div>

        </div>
        <div class="swiper-slide swiper-slide--four">
          <span>best city</span>
          <div class="slide-content">
            <h3>Paris</h3>

          </div>

        </div>
        <div class="swiper-slide swiper-slide--five">
          <span>best city</span>
          <div class="slide-content">
            <h3>Tokyo</h3>

          </div>

        </div>
        <div class="swiper-slide swiper-slide--six">
          <span>best city</span>
          <div class="slide-content">
            <h3>Chicago</h3>

          </div>

        </div>

      </div>

    </div>

    <div class="swiper-pagination"></div>
  </div>
  <div class="circle"></div>
</div>
  );
};

export default Slider;
