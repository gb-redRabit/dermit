/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Import element componets
import Nav from "./Nav";
import DescriptionAnime from "./DescriptionAnime";
import Home from "./Home";
import Anime from "./Anime";
import Galeria from "./Galeria";
import DescriptionEpisodes from "./DescriptionEpisodes";
import Filmy from "./Filmy";
import Spinners from "./Spinners";
// Import electon modul Inter-Process Communication
const { ipcRenderer } = window.require("electron");

function App() {
  const [dataAnime, setDataAnime] = useState({ hits: [] });

  useEffect(() => {
    ipcRenderer.send("start", "api");
    ipcRenderer.on("startOn", (e, d) => {
      setDataAnime(JSON.parse(d));
    });
  }, []);

  let animeTV;
  let animeMovie;
  if (dataAnime.length > 2) {
    animeTV = dataAnime
      .filter((item) => item.series_type !== "Movie")
      .map((item) => item);
    animeMovie = dataAnime
      .filter((item) => item.series_type === "Movie")
      .map((item) => item);
  }
  return dataAnime ? (
    <div className="flex min-h-screen">
      <Nav />
      <div
        className="bg-slate-950 pl-16 flex"
        style={{ maxWidth: "calc(100vw)", width: "calc(100vw )" }}
      >
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/anime"
            element={<Anime anime={animeTV} page="anime" />}
          />
          <Route
            path="/movie"
            element={<Filmy anime={animeMovie} page="filmy" />}
          />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/anime/:id" element={<DescriptionAnime />} />
          <Route path="/movie/:id" element={<DescriptionAnime />} />
          <Route path="/anime/:id/:id" element={<DescriptionEpisodes />} />
          <Route path="/movie/:id/:id" element={<DescriptionEpisodes />} />
          <Route path="/anime/:id/404" element={<Galeria />} />
        </Routes>
      </div>
    </div>
  ) : (
    <Spinners />
  );
}

export default App;
