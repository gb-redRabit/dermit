/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
// Import element componets
import ItemAnime from "./ItemAnime";
import Genres from "./Genres";
import Breadcrumbs from "./Breadcrumbs";
import Typography from "./Typography";
import Spinners from "./Spinners";
// Import react-icons
import { IconContext } from "react-icons";
import { CgMenuGridR } from "react-icons/cg";

import { AppContext } from "./AppContext";

const Anime = ({ anime, page }) => {
  // const { animeTV } = useContext(AppContext);
  // console.log(animeTV);
  return <div>aaa</div>;
};

export default Anime;
