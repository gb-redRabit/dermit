import React from 'react';
import {  useLocation } from 'react-router-dom';
import { useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import PalyerEpisodes from './PalyerEpisodes';

const {ipcRenderer} = window.require("electron");

const DescriptionEpisodes = (poprs) => {

    const [data, setData] = useState({ hits: [] }); 
    const [playerActive, setPlayerActive] = useState(); 
    const location = useLocation().pathname;
    const slug = location.slice(7,location.length);
    const slugEpisodes = location.slice(location.lastIndexOf('/'),location.length).length;

    useEffect(() => {
    ipcRenderer.send('getEpisodes', `${slug}`);
    ipcRenderer.on('onEpisodes', (e, d) => {    
        setData(JSON.parse(d))
     })
     
    },[]);

    if(data[0]){
      
       return (
        <div className="text-white flex flex-col justify-center items-center h-screen bg-cover" style={{ width: 'calc(100vw - 64px)'}}>
              <NavLink  to={location.slice(0,location.length - slugEpisodes )} >
                "powrót"
              </NavLink>
            {playerActive? <PalyerEpisodes item={playerActive}/>: < PalyerEpisodes item={data[0]}/>}
              
             {data.map(item =>{return <button key={item.id} onClick={((e)=>{setPlayerActive(item)})}>{item.player_hosting}</button>})}
        </div>
    );}else{
      return (<div> udpa </div>)
    }
}

export default DescriptionEpisodes;
