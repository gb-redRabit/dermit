/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
// Import react-icons
import { IconContext } from "react-icons";
import { TfiGallery, TfiVideoClapper, TfiHome } from "react-icons/tfi";
import { FaJedi } from "react-icons/fa";
import { FaDoorClosed } from "react-icons/fa";
import { AiOutlineAlipay } from "react-icons/ai";
// Import electon modul Inter-Process Communication
const { ipcRenderer } = window.require("electron");

const Nav = () => {
  const closeApp = () => {
    ipcRenderer.send("close");
  };

  return (
    <nav className="fixed flex flex-col py-7 justify-between items-center w-16 h-screen  text-white bg-slate-900 overflow-hidden z-10">
      <IconContext.Provider value={{ className: "text-4xl" }}>
        <FaJedi />
      </IconContext.Provider>
      <ul className="">
        <li className="flex justify-center items-center text-2xl p-3 rounded cursor-pointer hover:bg-slate-700">
          <NavLink to="/" className=" ">
            <IconContext.Provider value={{ className: "" }}>
              <TfiHome />
            </IconContext.Provider>
          </NavLink>
        </li>
        <li className="flex justify-center items-center text-2xl p-3 rounded cursor-pointer hover:bg-slate-700">
          <NavLink to="/anime">
            <IconContext.Provider value={{ className: "" }}>
              <AiOutlineAlipay />
            </IconContext.Provider>
          </NavLink>
        </li>
        <li className="flex justify-center items-center text-2xl p-3 rounded cursor-pointer hover:bg-slate-700">
          <NavLink to="/movie">
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
