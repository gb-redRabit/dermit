/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";

import { AppContext } from "./AppContext";

const Anime = ({ page }) => {
  const { animeMovie } = useContext(AppContext);
  console.log(animeMovie);
  return <div className="text-white">{page}</div>;
};

export default Anime;
