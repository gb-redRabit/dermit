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

const DescriptionEpisodes = (poprs) => {

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

    if(data[0]){
      
       return (
        <div className="text-white flex flex-col justify-center items-center h-screen bg-cover" style={{ width: 'calc(100vw - 64px)'}}>
          <h1 className='text-4xl mx-3'>Odcinek: {slugEpisodes}</h1>
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
              <NavLink  to="" style={{ color: 'white'}}>
              <IconContext.Provider value={{ className: "text-3xl mx-3 hover:text-yellow-500" }}>
                <BsArrowsFullscreen/>
              </IconContext.Provider>
              </NavLink>
              <NavLink  to={nextEpisodes}  onClick={window.location.reload} style={{ color: 'white'}}>
              <IconContext.Provider value={{ className: "text-4xl mx-3 hover:text-yellow-500" }}>
                <TbPlayerTrackNext/>
              </IconContext.Provider>
              </NavLink>
              </div>
              {playerActive? <PalyerEpisodes item={playerActive}/>: < PalyerEpisodes item={data[0]}/>}
                <div className=' flex gap-2 my-2'>
             {data.map(item =>{return <button className='text-lg border-solid border-2 border-gray-500 rounded-xl text-white px-5 py-2 text-center hover:text-yellow-500' key={item.id} onClick={((e)=>{setPlayerActive(item)})}>{item.player_hosting}</button>})}
              </div>
        </div>
    );}else{
      return (<div> udpa </div>)
    }
}

export default DescriptionEpisodes;
