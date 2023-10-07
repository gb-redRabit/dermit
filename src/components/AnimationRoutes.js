import React from "react";
import DescriptionAnime from "../pages/DescriptionAnime";
import Home from "../pages/Home";
import Anime from "../pages/Anime";
import DescriptionEpisodes from "../pages/DescriptionEpisodes";
import Filmy from "../pages/Filmy";
import ErrorPage from "../pages/ErrorPage";
import Profil from "../pages/Profil";
import Check from "../components/Check";
import { Routes, Route, useLocation } from "react-router-dom";

const AnimationRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/anime" element={<Anime page="anime" />} />
      <Route path="/movie" element={<Filmy page="filmy" />} />
      <Route path="/anime/:id" element={<DescriptionAnime />} />
      <Route path="/movie/:id" element={<DescriptionAnime />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/reset" element={<Check />} />
      <Route path="/anime/:id/:id" element={<DescriptionEpisodes />} />
      <Route path="/movie/:id/:id" element={<DescriptionEpisodes />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AnimationRoutes;
