"use client";

import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const Banner = () => {
  return (
    <div className="pt-4 px-4">
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <Image
            width={600}
            height={600}
            src="/assets/images/main_banner.png"
            alt=""
            className="w-full h-[260px] md:h-full rounded-3xl"
            priority
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
