/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
// Import element componets
import Nav from "./Nav";
import DescriptionAnime from "./DescriptionAnime";
import Home from "./Home";
import Anime from "./Anime";
import Galeria from "./Galeria";
import DescriptionEpisodes from "./DescriptionEpisodes";
import Filmy from "./Filmy";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <div className="flex min-h-screen">
      <Nav />
      <div
        className="bg-slate-950 ml-16 flex"
        style={{ maxWidth: "calc(100vw - 64px)", width: "calc(100vw - 64px)" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime page="anime" />} />
          <Route path="/movie" element={<Filmy page="filmyów" />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/anime/:id" element={<DescriptionAnime />} />
          <Route path="/movie/:id" element={<DescriptionAnime />} />
          <Route path="/anime/:id/:id" element={<DescriptionEpisodes />} />
          <Route path="/movie/:id/:id" element={<DescriptionEpisodes />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
