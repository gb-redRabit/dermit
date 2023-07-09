import React from "react";
import { NavLink } from "react-router-dom";

const ItemAnime = ({ item }) => {
  const type = item.series_type === "Movie" ? "movie" : "anime";
  return (
    <NavLink to={`/${type}/${item.slug}`}>
      <div className=" w-[232px] h-80 m-3 relative rounded-md overflow-hidden  after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:bg-gradient-to-t after:from-[rgba(0,0,0,0.3)] after:to-[rgba(0,0,0,0.3)] hover:after:from-[rgba(0,0,0,0.5)] hover:after:to-[rgba(0,0,0,0.5)]">
        <img src={item.cover} alt="item" className="w-full h-full" />
        <div className="absolute top-0 right-0 flex justify-center items-center w-7 h-7 rounded-bl-lg  text-white bg-slate-400 z-10">
          {item.episodes > 0 ? item.episodes : "?"}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 flex justify-start p-1 items-center mx-2 text-sm  cursor-pointer text-white z-10">
          {item.title}
        </div>
      </div>
    </NavLink>
  );
};

export default ItemAnime;
