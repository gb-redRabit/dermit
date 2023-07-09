import React from "react";
import { NavLink } from "react-router-dom";
import Spinners from "./Spinners";

// Import Swiper styles and script
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/grid";

const Swip = ({ data, type = "" }) => {
  if (type === "grid") {
    return (
      <Swiper
        slidesPerView={8}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        grid={{
          rows: 2,
        }}
        spaceBetween={15}
        modules={[Grid, Autoplay]}
        className="mySwiper h-[520px] w-full my-10 swpierNew"
      >
        {data[0]
          ? data.map((item, key) => (
              <SwiperSlide
                style={{ marginTop: "0" }}
                className="bg-cover "
                key={key}
              >
                <NavLink
                  to={`/anime/${item.anime_id}/${item.anime_episode_number}`}
                >
                  <div className="relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-b after:from-[rgba(0,0,0,0)] after:to-[rgba(0,0,0,0.3)]">
                    <img
                      src={item.cover}
                      alt=""
                      className="rounded-xl object-cover h-[250px] w-full"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-4/5 text-white  m-3 text-sm">
                    <p className="text-sm">{item.title}</p>
                    <p className="text-gray-950 text-sm font-medium">
                      Odcinek {item.anime_episode_number}
                    </p>
                  </div>
                </NavLink>
              </SwiperSlide>
            ))
          : ""}
      </Swiper>
    );
  } else {
    return (
      <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        slidesPerView={7}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Autoplay]}
        className="mySwiper h-[250px] w-full my-10"
      >
        {data[0]
          ? data.map((item, key) => (
              <SwiperSlide
                style={{ marginTop: "0" }}
                className="bg-cover "
                key={key}
              >
                <NavLink to={`/anime/${item.slug}`}>
                  <div className="relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-b after:from-[rgba(0,0,0,0)] after:to-[rgba(0,0,0,0.3)]">
                    <img
                      src={item.cover}
                      alt=""
                      className="rounded-xl object-cover h-[250px]  w-full"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-4/5 text-white font-bold m-3 text-sm">
                    {item.title}
                  </div>
                </NavLink>
              </SwiperSlide>
            ))
          : ""}
      </Swiper>
    );
  }
};
export default Swip;
