/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
// Import react-icons
import { IconContext } from "react-icons";
import { TfiVideoClapper, TfiHome } from "react-icons/tfi";
import { FaDoorClosed } from "react-icons/fa";
import { AiOutlineAlipay } from "react-icons/ai";
import Typography from "./Typography";
// Import electon modul Inter-Process Communication
const { ipcRenderer } = window.require("electron");

const Nav = () => {
  const closeApp = () => {
    ipcRenderer.send("close");
  };

  return (
    <nav className="fixed flex flex-col py-7 justify-between items-center w-16 h-screen  text-white bg-slate-900 overflow-hidden z-10">
      <div className=" flex flex-col justify-center items-center gap-4">
        <img
          className="rounded-full  w-14 h-14"
          alt="avatar"
          src="https://cdn.discordapp.com/avatars/244033183937462272/c01814814974eace4414f3dfcecd0470.png"
        />
        <Typography text={`Deus`} />
      </div>
      <ul className="">
        <li className="flex justify-center items-center text-2xl p-3 rounded cursor-pointer hover:bg-slate-700">
          <NavLink to="/" onClick={() => window.scrollTo({ top: 0 })}>
            <IconContext.Provider value={{ className: "" }}>
              <TfiHome />
            </IconContext.Provider>
          </NavLink>
        </li>
        <li className="flex justify-center items-center text-2xl p-3 rounded cursor-pointer hover:bg-slate-700">
          <NavLink to="/anime" onClick={() => window.scrollTo({ top: 0 })}>
            <IconContext.Provider value={{ className: "" }}>
              <AiOutlineAlipay />
            </IconContext.Provider>
          </NavLink>
        </li>
        <li className="flex justify-center items-center text-2xl p-3 rounded cursor-pointer hover:bg-slate-700">
          <NavLink to="/movie" onClick={() => window.scrollTo({ top: 0 })}>
            <IconContext.Provider value={{ className: "" }}>
              <TfiVideoClapper />
            </IconContext.Provider>
          </NavLink>
        </li>
      </ul>
      <button
        onClick={closeApp}
        className="flex justify-center items-center text-2xl p-3 rounded cursor-pointer hover:bg-slate-700"
      >
        <IconContext.Provider value={{ className: "" }}>
          <FaDoorClosed />
        </IconContext.Provider>
      </button>
    </nav>
  );
};

export default Nav;
