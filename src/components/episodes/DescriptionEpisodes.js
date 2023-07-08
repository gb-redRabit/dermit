/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {  Link, useLocation } from 'react-router-dom';
import { useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import PalyerEpisodes from './PalyerEpisodes';
import { IconContext } from "react-icons";
import {TbPlayerTrackPrev, TbPlayerTrackNext, TbBrandCodesandbox } from 'react-icons/tb';
import {BsArrowsFullscreen } from 'react-icons/bs'
const {ipcRenderer} = window.require("electron");

const DescriptionEpisodes = () => {
    const [w, setW] = useState(window.innerWidth*0.7); 
    const [h, setH] = useState(window.innerHeight*0.7); 
    const [data, setData] = useState({ hits: [] }); 
    const [playerActive, setPlayerActive] = useState(); 
    const location = useLocation().pathname;
    const slug = location.slice(7,location.length);
    const slugEpisodesLength = location.slice(location.lastIndexOf('/'),location.length).length;
    const slugEpisodes = location.slice(location.lastIndexOf('/') + 1 ,location.length);
    const popEpisodes = `${location.slice(0,location.length - slugEpisodesLength )}/${parseInt(slugEpisodes) -1}`
    const nextEpisodes = `${location.slice(0,location.length - slugEpisodesLength )}/${parseInt(slugEpisodes) +1}`

    useEffect(() => {
    ipcRenderer.send('getEpisodes', `${slug}`);
    ipcRenderer.on('onEpisodes', (e, d) => {    
        setData(JSON.parse(d))
     })
     
    },[]);
    const fullScreen = () => {
      setW(window.innerWidth*0.96)
      setH(window.innerHeight)
    }
    function changeBackground(e) {
      e.target.style.color = '#728a0b';
    }
    function changeBackground2(e) {
      e.target.style.color = 'white';
    }
    if(data[0]){
        console.log(data[0])
       return (
        <div className="text-white flex flex-col  items-center h-screen bg-cover min-h-screen w-[80vw] mx-auto" style={{ maxWidth: 'calc(100vw - 81px)'}}>
           <div className='flex flex-row justify-start gap-4  my-10  w-full'>
                    <NavLink  to="/" style={{ color: 'white', }}  onMouseEnter ={changeBackground} onMouseLeave={changeBackground2}>
                        Home
                    </NavLink>
                    <NavLink  to={location.slice(0,6)} style={{ color: 'white'}} onMouseEnter ={changeBackground} onMouseLeave={changeBackground2}>
                        Anime
                    </NavLink>
                    <NavLink  to={location.slice(0,location.length - slugEpisodesLength )} style={{ color: 'white'}} onMouseEnter ={changeBackground} onMouseLeave={changeBackground2}>
                    {location.slice(location.slice(0,6).length +1,location.length - slugEpisodesLength )}
                    </NavLink>
                    <NavLink  to={location} style={{ color: 'white'}} onMouseEnter ={changeBackground} onMouseLeave={changeBackground2}>
                        {slugEpisodes}
                    </NavLink>
                </div>
          <div className='flex justify-center items-center m-3 p-3 gap-4'>
              <NavLink  to={popEpisodes} onClick={window.location.reload} style={{ color: 'white'}}>
              <IconContext.Provider value={{ className: "text-4xl mx-3 hover:text-yellow-500" }}>
                <TbPlayerTrackPrev/>
              </IconContext.Provider>
              </NavLink>
              <NavLink  to={location.slice(0,location.length - slugEpisodesLength )} style={{ color: 'white'}}>
              <IconContext.Provider value={{ className: "text-4xl mx-3 hover:text-yellow-500" }}>
                <TbBrandCodesandbox/>
              </IconContext.Provider>
              </NavLink>
              <butin  className="cursor-pointer text-white" onClick={fullScreen}>
              <IconContext.Provider value={{ className: "text-3xl mx-3 hover:text-yellow-500" }}>
                <BsArrowsFullscreen/>
              </IconContext.Provider>
              </butin>
              <NavLink  to={nextEpisodes}  onClick={window.location.reload} style={{ color: 'white'}}>
              <IconContext.Provider value={{ className: "text-4xl mx-3 hover:text-yellow-500" }}>
                <TbPlayerTrackNext/>
              </IconContext.Provider>
              </NavLink>
              </div>
              {playerActive? <PalyerEpisodes item={playerActive} h={h} w={w}/>: < PalyerEpisodes item={data[0]} h={h} w={w}/>}
                <div className=' flex gap-2 my-2'>
             {data.map(item =>{return <button className='text-lg border-solid border-2 border-gray-500 rounded-xl text-white px-5 py-2 text-center hover:text-yellow-500' key={item.id} onClick={((e)=>{setPlayerActive(item)})}>{item.player_hosting}</button>})}
              </div>
        </div>
    );}else{
      return (<div> udpa </div>)
    }
}

export default DescriptionEpisodes;
