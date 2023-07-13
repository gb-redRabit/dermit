import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
// Import element componets
import Typography from "./Typography";
import Swipers from "./Swipers";
// Import electon modul Inter-Process Communication
const { ipcRenderer } = window.require("electron");

const Home = () => {
  const { anime, changeSeazon } = useContext(AppContext);

  const [data, setData] = useState();

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

    ipcRenderer.send(
      "apiTwo",
      `https://api.docchi.pl/v1/episodes/latest?season=${changeSeazon()}&season_year=${new Date().getFullYear()}&type=not`
    );
    ipcRenderer.on("apiSendTwo", (e, d) => {
      setDataNotAnime(JSON.parse(d));
    });

    if (anime[0]) {
      setData(
        anime.filter(
          (value) =>
            value.season_year === new Date().getFullYear() &&
            value.season === changeSeazon()
        )
      );
    }
  }, [anime]);

  return (
    <div className=" flex flex-col overflow-hidden justify-start items-center min-h-screen w-[90vw] mx-auto pt-10 max-h-screen">
      <Typography text={`${changeSeazon("pl")} ${new Date().getFullYear()}`} />
      <Swipers data={data} type={"top"} />
      <div className="flex w-full justify-around items-center ">
        <div className="flex flex-col justify-center items-center w-1/2">
          <Typography text={`Nowe odcinki`} />
          {dataNewAnime && <Swipers data={dataNewAnime} type={"bottom"} />}
        </div>
        <div className="flex flex-col justify-center items-center w-1/2">
          <Typography text={`Nieemitowane odcinki`} />
          {dataNotAnime && <Swipers data={dataNotAnime} type={"bottom"} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
