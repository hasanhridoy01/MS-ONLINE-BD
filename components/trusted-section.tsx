"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const images = [
  "/Frame 50.png",
  "/Frame 51.png",
  "/Frame 52.png",
  "/Frame 53.png",
  "/Frame 54.png",
  "/Frame 55.png",
];

export default function TrustedSection() {
  return (
    <section
      id="trusted"
      className="md:py-20 py-14 bg-[#FAFDFF] transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="md:text-[18px] text-[16px] font-semibold font-inter mb-2 text-neutral-700">
            Trusted By
          </h2>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src="https://picsum.photos/300/300"
                alt={`Trusted Logo ${index + 1}`}
                className="w-[129px] h-[140px] object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}