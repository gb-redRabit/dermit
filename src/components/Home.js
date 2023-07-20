import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router";
// Import element componets
import Typography from "./Typography";
import Swipers from "./Swipers";
import Genres from "./Genres";
// Import electon modul Inter-Process Communication
const { ipcRenderer } = window.require("electron");

const Home = () => {
  const { anime, changeSeazon } = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  const [dataNewAnime, setDataNewAnime] = useState({ hits: [] });
  const [dataNotAnime, setDataNotAnime] = useState({ hits: [] });
  const [dataNextAnime, setDataNextAnime] = useState({ hits: [] });

  const geee = () => {
    navigate("/anime/");
  };

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

      switch (changeSeazon()) {
        case "winter":
          setDataNextAnime(
            anime.filter(
              (value) =>
                value.season_year === new Date().getFullYear() &&
                value.season === "spring"
            )
          );
          break;
        case "spring":
          setDataNextAnime(
            anime.filter(
              (value) =>
                value.season_year === new Date().getFullYear() &&
                value.season === "summer"
            )
          );
          break;
        case "summer":
          setDataNextAnime(
            anime.filter(
              (value) =>
                value.season_year === new Date().getFullYear() &&
                value.season === "fall"
            )
          );
          break;
        case "fall":
          setDataNextAnime(
            anime.filter(
              (value) =>
                value.season_year === new Date().getFullYear() + 1 &&
                value.season === "winter"
            )
          );
          break;
        default:
          console.log("default");
      }
    }
  }, [changeSeazon, anime]);
  return (
    <>
      <div className=" flex flex-col overflow-hidden justify-start items-center min-h-screen w-[90vw] mx-auto pt-10  relative">
        <Typography
          text={`${changeSeazon("pl")} ${new Date().getFullYear()}`}
        />
        <Swipers data={data} type={"top"} />
        <div className="flex w-full justify-around items-center ">
          <div className="flex flex-col justify-center items-center w-1/2">
            <Typography text={`Nowe odcinki`} />
            {dataNewAnime && (
              <Swipers data={dataNewAnime} type={"bottom"} pages={4} />
            )}
          </div>
          <div className="flex flex-col justify-center items-center w-1/2">
            <Typography text={`Nieemitowane odcinki`} />
            {dataNotAnime && (
              <Swipers data={dataNotAnime} type={"bottom"} pages={4} />
            )}
          </div>
        </div>
        <Typography text={`Już w przyszłym sezonie`} />
        {dataNewAnime && (
          <Swipers data={dataNextAnime} type={"bottom"} pages={8} />
        )}
      </div>
    </>
  );
};

export default Home;
