import React from "react";
import { NavLink } from "react-router-dom";
const activeEnd = (e) => {
  e.target.style.color = "#728a0b";
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
    <div className="flex flex-row justify-start gap-4  my-10  w-full text-white">
      {link1}
      {link2}
      {link3}
      {link4}
    </div>
  );
};

export default Breadcrumbs;
