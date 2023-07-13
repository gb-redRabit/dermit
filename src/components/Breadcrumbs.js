import React from "react";
import { NavLink } from "react-router-dom";
import { BsDot } from "react-icons/bs";
const activeEnd = (e) => {
  e.target.style.color = "rgb(234,179,8)";
};

const activeStart = (e) => {
  e.target.style.color = "white";
};

const Breadcrumbs = ({
  bcHome = true,
  bcTyp = false,
  bcTitle = false,
  bcTitleText,
  bcEpisodes = false,
}) => {
  let link1, link2, link3, link4;
  if (bcHome)
    link1 = (
      <NavLink
        to="/"
        style={{ color: "white" }}
        onMouseEnter={activeEnd}
        onMouseLeave={activeStart}
      >
        Home
      </NavLink>
    );
  if (bcTyp)
    link2 = (
      <NavLink
        to={`/${bcTyp}`}
        style={{ color: "white" }}
        onMouseEnter={activeEnd}
        onMouseLeave={activeStart}
        className={"first-letter:uppercase"}
      >
        {bcTyp}
      </NavLink>
    );
  if (bcTitle)
    link3 = (
      <NavLink
        to={`/${bcTyp}/${bcTitle}`}
        style={{ color: "white" }}
        onMouseEnter={activeEnd}
        onMouseLeave={activeStart}
      >
        {bcTitleText ? bcTitleText : bcTitle}
      </NavLink>
    );
  if (bcEpisodes)
    link4 = (
      <NavLink
        to={`/${bcTyp}/${bcTitle}/${bcEpisodes}`}
        style={{ color: "white" }}
        onMouseEnter={activeEnd}
        onMouseLeave={activeStart}
      >
        {bcEpisodes}
      </NavLink>
    );

  return (
    <div className="flex flex-row justify-start items-center gap-1  my-10  w-full text-white">
      {link1} {link2 && <BsDot />}
      {link2} {link3 && <BsDot />}
      {link3} {link4 && <BsDot />}
      {link4}
    </div>
  );
};

export default Breadcrumbs;
