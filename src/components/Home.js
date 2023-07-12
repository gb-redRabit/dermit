import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
// Import element componets
import Breadcrumbs from "./Breadcrumbs";
import Typography from "./Typography";

// Import electon modul Inter-Process Communication
const { ipcRenderer } = window.require("electron");

const Home = () => {
  const { anime, changeSeazon } = useContext(AppContext);

  const [data, setData] = useState();
  const [dataAnime, setDataAnime] = useState(anime);
  const [dataNewAnime, setDataNewAnime] = useState({ hits: [] });
  const [dataNotAnime, setDataNotAnime] = useState({ hits: [] });

  useEffect(() => {
    ipcRenderer.send(
      "api",
      `https://api.docchi.pl/v1/episodes/latest?season=${changeSeazon()}&season_year=${new Date().getFullYear()}"`
    );
    ipcRenderer.on("apiSend", (e, d) => {
      setDataNewAnime(JSON.parse(d));
    });
  }, []);
  useEffect(() => {
    ipcRenderer.send(
      "apiTwo",
      `https://api.docchi.pl/v1/episodes/latest?season=${changeSeazon()}&season_year=${new Date().getFullYear()}&type=not`
    );
    ipcRenderer.on("apiSendTwo", (e, d) => {
      setDataNotAnime(JSON.parse(d));
    });
  }, []);
  useEffect(() => {
    if (dataAnime[0]) {
      setData(
        anime.filter(
          (value) =>
            value.season_year === new Date().getFullYear() &&
            value.season === changeSeazon()
        )
      );
    }
  }, []);

  return (
    <div
      className=" flex flex-col overflow-hidden justify-start items-center min-h-screen w-[80vw] mx-auto"
      style={{ maxWidth: "calc(100vw - 81px)" }}
    >
      <Breadcrumbs />
      <Typography text={`${changeSeazon("pl")} ${new Date().getFullYear()}`} />
      {data &&
        data.map((item, index) => (
          <div className="text-white" key={index}>
            {item.title}
          </div>
        ))}
      <Typography text={`Nowe odcinki`} />

      <Typography text={`Nieemitowane odcinki`} />
    </div>
  );
};

export default Home;
