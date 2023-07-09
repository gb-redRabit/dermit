import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// Import element componets
import Breadcrumbs from "./Breadcrumbs";
// Import Swiper styles and script
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// Import electon modul Inter-Process Communication
const { ipcRenderer } = window.require("electron");

const Home = () => {
  const [data, setData] = useState();
  const [dataAnime, setDataAnime] = useState({ hits: [] });

  useEffect(() => {
    ipcRenderer.send("start", "api");
    ipcRenderer.on("startOn", (e, d) => {
      setDataAnime(JSON.parse(d));
    });
  }, []);
  useEffect(() => {
    if (dataAnime[0]) {
      setData(
        dataAnime.filter(
          (value) =>
            value.season_year === new Date().getFullYear() &&
            value.season === changeSeazon()
        )
      );
    }
  });

  const changeSeazon = (language) => {
    const month = new Date().getMonth();
    if (language !== "pl") {
      if (month <= 2) {
        return "winter";
      }
      if (month > 2 && month <= 5) {
        return "spring";
      }
      if (month > 5 && month <= 8) {
        return "summer";
      }
      if (month > 8 && month <= 11) {
        return "fall";
      }
    } else {
      if (month <= 2) {
        return "Jesień";
      }
      if (month > 2 && month <= 5) {
        return "Wiosna";
      }
      if (month > 5 && month <= 8) {
        return "Lato";
      }
      if (month > 8 && month <= 11) {
        return "Zima";
      }
    }
  };
  if (data !== undefined)
    return (
      <div
        className=" flex flex-col overflow-hidden justify-start items-center min-h-screen w-[80vw] mx-auto"
        style={{ maxWidth: "calc(100vw - 81px)" }}
      >
        <Breadcrumbs />
        <h1 className="text-xl font-medium text-white">{`${changeSeazon(
          "pl"
        )} ${new Date().getFullYear()}`}</h1>
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={6}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper h-[300px] w-full my-10"
        >
          {data
            ? data.map((item, key) => (
                <SwiperSlide
                  style={{ marginTop: "0" }}
                  className="bg-cover "
                  key={key}
                >
                  <NavLink to={`/anime/${item.slug}`}>
                    <div className="relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-tl after:from-[rgba(0,0,0,0)] after:to-[rgba(0,0,0,0.3)]">
                      <img
                        src={item.cover}
                        alt=""
                        className="rounded-xl object-cover h-[300px] "
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-4/5 text-white font-bold m-3 text-sm">
                      {item.title}
                    </div>
                  </NavLink>
                </SwiperSlide>
              ))
            : "aa"}
        </Swiper>
      </div>
    );
};

export default Home;
