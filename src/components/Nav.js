/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { NavLink } from "react-router-dom";
// Import react-icons
import { IconContext } from "react-icons";
import { TfiVideoClapper, TfiHome } from "react-icons/tfi";
import { FaDoorClosed, FaUserAlt } from "react-icons/fa";
import { AiOutlineAlipay } from "react-icons/ai";
import Typography from "./Typography";
// Import electon modul Inter-Process Communication
const { ipcRenderer } = window.require("electron");

const Nav = () => {
  const closeApp = () => {
    ipcRenderer.send("close");
  };

  const { accepte, profil } = useContext(AppContext);

  return (
    <nav className="fixed flex flex-col py-7 justify-between items-center w-16 h-screen  text-white bg-slate-900 overflow-hidden z-10">
      {accepte && (
        <div className=" flex flex-col justify-center items-center gap-4">
          <img
            className="rounded-full  w-14 h-14"
            alt="avatar"
            src={profil.avatar}
          />
          <Typography text={profil.nickname} />
        </div>
      )}
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
        <li className="flex justify-center items-center text-2xl p-3 rounded cursor-pointer hover:bg-slate-700">
          <NavLink to="/profil" onClick={() => window.scrollTo({ top: 0 })}>
            <IconContext.Provider value={{ className: "" }}>
              <FaUserAlt />
            </IconContext.Provider>
          </NavLink>
        </li>
        <li className="flex justify-center items-center text-sm p-3 rounded cursor-pointer hover:bg-slate-700">
          <NavLink to="/reset" onClick={() => window.scrollTo({ top: 0 })}>
            <IconContext.Provider value={{ className: "" }}>
              <FaUserAlt />
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
