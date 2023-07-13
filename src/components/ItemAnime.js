import React from "react";
import { NavLink } from "react-router-dom";
const ItemAnime = ({ item, over }) => {
  const type = item.series_type === "Movie" ? "movie" : "anime";

  return (
    <NavLink to={`/${type}/${item.slug}`}>
      <div
        className="box  w-[195px] relative rounded-md overflow-hidden transition-all duration-1000 ease-linear after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:bg-gradient-to-t after:from-[rgba(0,0,0,0.3)] after:to-[rgba(0,0,0,0.3)] hover:after:from-[rgba(0,0,0,0.5)] hover:after:to-[rgba(0,0,0,0.5)]"
        style={
          over
            ? {
                height: "265px",
                margin: "12px",
              }
            : {
                height: "0",
                transform: "all 1s ease-out",
              }
        }
      >
        <img src={item.cover} alt="item" className="w-full h-full" />
        <div className="absolute top-0 right-0 flex justify-center items-center w-7 h-7 rounded-bl-lg  text-whit bg-gray-800 text-white z-10">
          {item.episodes > 0 ? item.episodes : "?"}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 flex justify-start p-1 items-center mx-2 text-sm  cursor-pointer text-white z-10">
          {item.title.length < 20
            ? item.title
            : `${item.title.slice(0, 20)}...`}
        </div>
      </div>
    </NavLink>
  );
};

export default ItemAnime;
