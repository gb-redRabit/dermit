import React from "react";
import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { BsDot } from "react-icons/bs";
const Swipers = ({ data, type, pages }) => {
  if (type === "top")
    return (
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        spaceBetween={60}
        slidesPerView={3}
        className="w-full h-[420px]  my-5"
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide
              key={`${index}-${item.mal_id}`}
              className="group !h-[380px] relative text-white overflow-hidden rounded-xl bg-cover after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:bg-gradient-to-t after:from-[rgba(0,0,0,0.4)] after:to-[rgba(0,0,0,0.4)] hover:text-yellow-500 hover:after:from-[rgba(0,0,0,0.6)] hover:after:to-[rgba(0,0,0,0.6)]"
              style={{ backgroundImage: `url(${item.cover})` }}
            >
              <div className="text-xl font-medium absolute top-4 left-6 right-6 flex flex-col  z-10 transition-all duration-300 ease-linear">
                <NavLink to={`/anime/${item.slug}`}>{item.title}</NavLink>
              </div>
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between z-10">
                <div className="text-md  flex items-center gap-1 transition-all duration-300 ease-linear">
                  <div>{item.series_type}</div>
                  <BsDot />
                  <div>Odcinki {item.episodes}</div>
                </div>
                <div className="flex gap-1">
                  {item.genres.map((text, id) => (
                    <div className="text-xs border-solid border-2 border-text-white rounded-xl text-white p-1 text-center transition-all duration-300 ease-linear group-hover:border-yellow-500 group-hover:text-yellow-500">
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    );
  else
    return (
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        slidesPerView={pages}
        className=" w-[97%] h-[300px]  my-10"
      >
        {data[0] &&
          data.map((item, index) => (
            <SwiperSlide
              key={`${index}-${item.title}-${
                item.anime_episode_number
                  ? item.anime_episode_number
                  : item.slug
              }`}
              className="group !h-full  relative text-white overflow-hidden rounded-xl bg-cover after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:bg-gradient-to-t after:from-[rgba(0,0,0,0.4)] after:to-[rgba(0,0,0,0.4)] hover:text-yellow-500 hover:after:from-[rgba(0,0,0,0.6)] hover:after:to-[rgba(0,0,0,0.6)]"
              style={{ backgroundImage: `url(${item.cover})` }}
            >
              <div className="text-md font-medium absolute top-2 left-2 right-2 flex flex-col  z-10 transition-all duration-300 ease-linear">
                {item.anime_episode_number ? (
                  <NavLink
                    to={`/anime/${item.anime_id}/${item.anime_episode_number}`}
                  >
                    {item.title.length < 20
                      ? item.title
                      : `${item.title.slice(0, 30)}...`}
                  </NavLink>
                ) : (
                  <NavLink to={`/anime/${item.slug}`}>
                    {item.title.length < 20
                      ? item.title
                      : `${item.title.slice(0, 30)}...`}
                  </NavLink>
                )}
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between z-10">
                <div className="text-sm  flex items-center gap-1 transition-all duration-300 ease-linear">
                  <div>
                    {item.anime_episode_number
                      ? `Odcinki ${item.anime_episode_number}`
                      : ""}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    );
};

export default Swipers;
