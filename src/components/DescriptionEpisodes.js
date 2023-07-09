/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
// Import element componets
import PalyerEpisodes from "./PalyerEpisodes";
import Breadcrumbs from "./Breadcrumbs";
import Genres from "./Genres";
import Spinners from "./Spinners";
// Import react-icons
import { IconContext } from "react-icons";
import {
  TbPlayerTrackPrev,
  TbPlayerTrackNext,
  TbBrandCodesandbox,
} from "react-icons/tb";
import { BsArrowsFullscreen } from "react-icons/bs";
// Import electon modul Inter-Process Communication
const { ipcRenderer } = window.require("electron");

const DescriptionEpisodes = () => {
  const [w, setW] = useState(window.innerWidth * 0.7);
  const [h, setH] = useState(window.innerHeight * 0.7);
  const [data, setData] = useState({ hits: [] });
  const [dataAnime, setDataAnime] = useState({ hits: [] });
  const [playerActive, setPlayerActive] = useState();
  const location = useLocation().pathname;
  const slug = location.slice(7, location.length);
  const navigate = useNavigate();

  const slugEpisodesLength = location.slice(
    location.lastIndexOf("/"),
    location.length
  ).length;
  const slugEpisodes = location.slice(
    location.lastIndexOf("/") + 1,
    location.length
  );
  const popEpisodes = `${location.slice(
    0,
    location.length - slugEpisodesLength
  )}/${parseInt(slugEpisodes) - 1}`;
  const nextEpisodes = `${location.slice(
    0,
    location.length - slugEpisodesLength
  )}/${parseInt(slugEpisodes) + 1}`;

  useEffect(() => {
    ipcRenderer.send("getEpisodes", `${slug}`);
    ipcRenderer.on("onEpisodes", (e, d) => {
      setData(JSON.parse(d));
    });
  }, []);

  useEffect(() => {
    ipcRenderer.send(
      "getAnime",
      slug.slice(0, slug.length - slugEpisodesLength)
    );
    ipcRenderer.on(
      "onAnime",
      (e, d) => {
        setDataAnime(JSON.parse(d));
      },
      []
    );
  }, []);

  const fullScreen = (e) => {
    if (e.target.style.position !== "absolute") {
      e.target.style.position = "absolute";
      e.target.style.top = "20px";
      e.target.style.left = "20px";
      setW(window.innerWidth);
      setH(window.innerHeight);
    } else {
      e.target.style.position = "relative";
      e.target.style.top = "auto";
      e.target.style.left = "auto";
      setW(window.innerWidth * 0.7);
      setH(window.innerHeight * 0.7);
    }
  };
  if (data[0])
    return (
      <div
        className="text-white flex flex-col  items-center h-screen bg-cover min-h-screen w-[80vw] mx-auto"
        style={{ maxWidth: "calc(100vw - 81px)" }}
      >
        <Breadcrumbs
          bcHome={true}
          bcTyp={location.slice(1, 6)}
          bcTitle={slug.slice(0, slug.length - slugEpisodesLength)}
          bcTitleText={dataAnime.title}
          bcEpisodes={slugEpisodes}
        />
        <div className="flex justify-center items-center m-3 p-3 gap-4">
          <NavLink
            to={popEpisodes}
            onClick={() => {
              navigate(popEpisodes);
              navigate(0);
            }}
            style={
              slugEpisodes === "1"
                ? { cursor: "not-allowed", color: "white" }
                : { cursor: "default", color: "white" }
            }
          >
            <IconContext.Provider
              value={{ className: "text-4xl mx-3 hover:text-yellow-500" }}
            >
              <TbPlayerTrackPrev />
            </IconContext.Provider>
          </NavLink>
          <NavLink
            to={location.slice(0, location.length - slugEpisodesLength)}
            style={{ color: "white" }}
          >
            <IconContext.Provider
              value={{ className: "text-4xl mx-3 hover:text-yellow-500" }}
            >
              <TbBrandCodesandbox />
            </IconContext.Provider>
          </NavLink>
          <butin
            className="cursor-pointer text-white z-50"
            onClick={(e) => fullScreen(e)}
          >
            <IconContext.Provider
              value={{ className: "text-3xl mx-3 hover:text-yellow-500" }}
            >
              <BsArrowsFullscreen />
            </IconContext.Provider>
          </butin>
          <NavLink
            to={nextEpisodes}
            onClick={() => {
              navigate(nextEpisodes);
              navigate(0);
            }}
            style={
              dataAnime.episodes === parseInt(slugEpisodes)
                ? { cursor: "not-allowed", color: "white" }
                : { cursor: "default", color: "white" }
            }
          >
            <IconContext.Provider
              value={{ className: "text-4xl mx-3 hover:text-yellow-500" }}
            >
              <TbPlayerTrackNext />
            </IconContext.Provider>
          </NavLink>
        </div>
        {playerActive ? (
          <PalyerEpisodes item={playerActive} h={h} w={w} />
        ) : (
          <PalyerEpisodes item={data[0]} h={h} w={w} />
        )}
        <div className=" flex gap-2 my-2 p-5">
          {data.map((item) => {
            return (
              <Genres
                text={`${item.player_hosting} - ${item.translator_title}`}
                click={(e) => {
                  setPlayerActive(item);
                }}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    );
};

export default DescriptionEpisodes;
