/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
// Import element componets
import PalyerEpisodes from "./PalyerEpisodes";
import Breadcrumbs from "./Breadcrumbs";
import Genres from "./Genres";
// Import react-icons
import { IconContext } from "react-icons";
import {
  TbPlayerTrackPrev,
  TbPlayerTrackNext,
  TbBrandCodesandbox,
  TbLink,
} from "react-icons/tb";

// Import electon modul Inter-Process Communication
const { ipcRenderer, shell } = window.require("electron");

const DescriptionEpisodes = () => {
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

  const unClickable = (e) => {
    document.querySelectorAll(" button").forEach((item) => {
      item.style.color = "rgb(255, 255, 255)";
    });
  };
  console.log(dataAnime);
  if (data[0])
    return (
      <div
        className="text-white flex flex-col  items-center h-screen bg-cover w-[80vw] mx-auto"
        style={{ maxWidth: "calc(100vw - 81px)" }}
      >
        <Breadcrumbs
          bcHome={true}
          bcTyp={location.slice(1, 6)}
          bcTitle={slug.slice(0, slug.length - slugEpisodesLength)}
          bcTitleText={dataAnime.title}
          bcEpisodes={slugEpisodes}
        />
        <div className="flex flex-row">
          <div className="flex flex-col  items-center m-3 p-2 gap-4">
            <div className="flex  gap-4">
              <NavLink
                to={popEpisodes}
                className="group flex justify-center items-center bg-slate-900 p-2 rounded gap-3 text-sm order-1"
                onClick={() => {
                  navigate(popEpisodes);
                  navigate(0);
                }}
                style={
                  slugEpisodes === "1"
                    ? {
                        cursor: "not-allowed",
                        color: "white",
                        opacity: 0.6,
                        pointerEvents: "none",
                      }
                    : { cursor: "cursor-pointer", color: "white" }
                }
              >
                <IconContext.Provider
                  value={{ className: "text-xl group-hover:text-yellow-500" }}
                >
                  <TbPlayerTrackPrev />
                  Poprzedni
                </IconContext.Provider>
              </NavLink>
              <NavLink
                className="group flex justify-center items-center bg-slate-900 p-2 rounded gap-3 text-sm order-2"
                to={location.slice(0, location.length - slugEpisodesLength)}
                style={{ color: "white" }}
              >
                <IconContext.Provider
                  value={{ className: "text-xl group-hover:text-yellow-500" }}
                >
                  <TbBrandCodesandbox />
                  Lista
                </IconContext.Provider>
              </NavLink>
              <button
                className="group flex justify-center items-center bg-slate-900 p-2 rounded gap-3 text-sm order-4"
                type="button"
                onClick={() => {
                  shell.openExternal(
                    `https://docchi.pl/production/as/${dataAnime.slug}/${slugEpisodes}`
                  );
                }}
              >
                <IconContext.Provider
                  value={{ className: "text-xl group-hover:text-yellow-500" }}
                >
                  <TbLink />
                </IconContext.Provider>
                Link
              </button>
              <NavLink
                className="group flex justify-center items-center bg-slate-900 p-2 rounded gap-3 text-sm order-4"
                to={nextEpisodes}
                onClick={() => {
                  navigate(nextEpisodes);
                  navigate(0);
                }}
                style={
                  dataAnime.episodes === parseInt(slugEpisodes)
                    ? {
                        cursor: "not-allowed",
                        color: "white",
                        opacity: 0.6,
                        pointerEvents: "none",
                      }
                    : { cursor: "cursor-pointer", color: "white" }
                }
              >
                Nastepny
                <IconContext.Provider
                  value={{ className: "text-xl group-hover:text-yellow-500" }}
                >
                  <TbPlayerTrackNext />
                </IconContext.Provider>
              </NavLink>
            </div>
            {playerActive ? (
              <PalyerEpisodes item={playerActive} />
            ) : (
              <PalyerEpisodes item={data[0]} />
            )}
          </div>
          {data.length > 1 && (
            <div className="flex flex-col justify-center items-start gap-4 w-[300px]">
              {data.map((item) => {
                return (
                  <Genres
                    text={`${item.player_hosting} - ${item.translator_title}`}
                    click={(e) => {
                      setPlayerActive(item);
                      unClickable(e);
                    }}
                    key={item.id}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
};

export default DescriptionEpisodes;
