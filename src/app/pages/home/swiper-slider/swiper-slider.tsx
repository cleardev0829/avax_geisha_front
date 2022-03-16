import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.css"

import "./styles.css";

// import Swiper core and required modules
import SwiperCore, {
    EffectCoverflow, Autoplay
} from 'swiper';

// install Swiper modules
SwiperCore.use([EffectCoverflow,Autoplay]);

export default function SwiperSlider() {
    return (
        <div className="min-vh-50">
            <Swiper
                effect={'coverflow'} grabCursor={true} centeredSlides={true} loop={true} slidesPerView={'auto'} coverflowEffect={{
                    "rotate": 30,
                    "stretch": 3,
                    "depth": 200,
                    "modifier": 1,
                    "slideShadows": true
                }} autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                    }}
                    pagination={false} className="mySwiper bg-transparent">
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/1.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/2.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/3.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/4.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/5.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/6.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/7.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/8.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/9.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/10.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/11.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/12.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/13.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/14.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/15.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/16.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/17.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/18.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/19.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="border-secondary border-5 border-radius-10" src="./images/geishas/20.png" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
