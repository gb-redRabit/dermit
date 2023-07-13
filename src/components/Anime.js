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
import ButtonScrol from "./ButtonScrol";

const Anime = ({ page }) => {
  const { anime } = useContext(AppContext);
  const [data, setData] = useState(anime);
  const [genres, setGenres] = useState([]);
  const [type, setType] = useState([]);
  const [text, setText] = useState([]);

  const [genresDisplay, setGenresDisplay] = useState(true);
  const [flaga, setFlaga] = useState(true);
  const [loaderLimit, setloaderLimit] = useState(30);

  const location = useLocation().pathname;

  useEffect(() => {
    data.forEach((item) => {
      setGenres(
        (preValue) =>
          (preValue = Array.from(new Set([...preValue, ...item.genres])))
      );
      setType(
        (preValue) =>
          (preValue = Array.from(new Set([...preValue, item.series_type])))
      );
    });

    const addItem = (e) => {
      if (window.scrollY > document.body.offsetHeight - 1300) {
        setloaderLimit((preValue) => (preValue += 7));
      }
    };

    window.addEventListener("scroll", addItem, { passive: true });
    return () => {
      window.removeEventListener("scroll", addItem);
    };
  }, []);

  const searchInput = (e) => {
    setText(e.target.value.toLowerCase());
    setData(anime.filter((word) => word.title.toLowerCase().includes(text)));
  };

  const displayGenres = () => {
    setGenresDisplay(!genresDisplay);
  };

  const clickGenres = (e) => {
    setloaderLimit(30);

    document.querySelectorAll(" button").forEach((item) => {
      item.style.color = "rgb(255, 255, 255)";
    });

    setData(
      anime.filter((word) => [...word.genres].includes(e.target.innerText))
    );
    document.querySelector("select").value = "";
  };

  const sortAz = (e) => {
    setloaderLimit(30);

    document.querySelectorAll("#sort button").forEach((item) => {
      item.style.color = "rgb(255, 255, 255)";
    });

    if (flaga) {
      setData([...data].sort((a, b) => b.title.localeCompare(a.title)));
      e.target.innerHTML = `Z-A`;
      setFlaga(!flaga);
    } else {
      setData([...data].sort((a, b) => a.title.localeCompare(b.title)));
      e.target.innerHTML = "A-Z";
      setFlaga(!flaga);
    }
  };

  const sortData = (e) => {
    setloaderLimit(30);

    document.querySelectorAll("#sort button").forEach((item) => {
      item.style.color = "rgb(255, 255, 255)";
    });

    if (flaga) {
      setData(
        [...data].sort(
          (a, b) => new Date(a.aired_from) - new Date(b.aired_from)
        )
      );
      e.target.innerText = "Od najnowszych";
      setFlaga(!flaga);
    } else {
      setData(
        [...data].sort(
          (a, b) => new Date(b.aired_from) - new Date(a.aired_from)
        )
      );
      e.target.innerText = "Od najstarszych";
      setFlaga(!flaga);
    }
  };

  const sortEpisodes = (e) => {
    setloaderLimit(30);

    document.querySelectorAll("#sort button").forEach((item) => {
      item.style.color = "rgb(255, 255, 255)";
    });

    if (flaga) {
      setData(
        [...data].sort((a, b) => new Date(a.episodes) - new Date(b.episodes))
      );
      e.target.innerText = "Od najmniejszej ilości";
      setFlaga(!flaga);
    } else {
      setData(
        [...data].sort((a, b) => new Date(b.episodes) - new Date(a.episodes))
      );
      e.target.innerText = "Od najwiekszej ilości";
      setFlaga(!flaga);
    }
  };

  const selectType = (e) => {
    setloaderLimit(30);

    document.querySelectorAll("button").forEach((item) => {
      item.style.color = "rgb(255, 255, 255)";
    });

    if ("all" === e.target.value) setData(anime);
    else setData(anime.filter((word) => word.series_type === e.target.value));
  };

  return (
    <div
      className="flex  flex-col justify-start items-start flex-wrap  min-h-screen w-[80vw] mx-auto"
      style={{ maxWidth: "calc(100vw - 81px)" }}
    >
      <ButtonScrol />
      <Breadcrumbs
        bcHome={true}
        bcTyp={location.slice(1, 6)}
        bcTitle={false}
        bcEpisodes={false}
      />
      <div className="flex justify-between items-center text-white bg-slate-900 w-full p-4 rounded my-10">
        <div>
          <Typography text={`Lista ${page}`} />
          <div className="flex gap-1 my-3" id="sort">
            <Genres
              text="A-Z"
              click={(e) => {
                sortAz(e);
              }}
            />
            <Genres
              text="Od najnowszych"
              click={(e) => {
                sortData(e);
              }}
            />
            <Genres
              text="Od najwiekszej ilości"
              click={(e) => {
                sortEpisodes(e);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <input
            type="search"
            name="search"
            value={text}
            placeholder="szukaj..."
            className="h-14 w-full block py-2 px-2 text-xl text-gray-500 bg-gray-950 border-0 border-b-2 border-gray-500 appearance-none rounded"
            onChange={searchInput}
          />
          <button
            onClick={displayGenres}
            className=" h-16 w-16 hover:text-yellow-500"
          >
            <IconContext.Provider
              value={{ className: "h-full w-full bg-slate-900  " }}
            >
              <CgMenuGridR />
            </IconContext.Provider>
          </button>
        </div>
      </div>
      <div
        className="mb-10 flex bg-slate-900 w-full rounded transition-all duration-300 ease-linear overflow-hidden overflow-y-hidden"
        style={genresDisplay ? { height: "0px" } : { height: "200px" }}
      >
        <div className="flex flex-col w-4/5 gap-4 my-4 ml-4">
          <Typography text={`Tagi`} />
          <div className="flex flex-row flex-wrap  gap-2" id="genres">
            {genres.map((text, id) => (
              <Genres text={text} click={clickGenres} key={id} />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-1/5 gap-4 ml-5 mt-4">
          <Typography text={`Rodzaj`} />
          <div className="flex flex-row flex-wrap h-full gap-2">
            <select
              onChange={selectType}
              className="h-14 w-4/5 block py-2 px-2 text-xl text-gray-500 bg-gray-950 border-0 border-b-2 border-gray-500 appearance-none rounded"
            >
              <option value="all">Każdy</option>
              {type.map((item, id) => (
                <option key={id} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className=" flex  justify-center items-center flex-wrap my-4 ">
        {data.map((item, id) =>
          id >= loaderLimit ? (
            ""
          ) : (
            <ItemAnime item={item} key={id} over={true} />
          )
        )}
      </div>
    </div>
  );
};

export default Anime;
