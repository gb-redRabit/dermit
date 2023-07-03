import React from 'react';
import {  useLocation } from 'react-router-dom';
import { useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';
const {ipcRenderer} = window.require("electron");

const DescriptionEpisodes = () => {
    const [data, setData] = useState({ hits: [] }); 

    const slug = useLocation().pathname.slice(7,useLocation().pathname.length);
    useEffect(() => {
    ipcRenderer.send('getEpisodes', `${slug}`);
    ipcRenderer.on('onEpisodes', (e, d) => {    
        setData(JSON.parse(d))
     })
    },[]);

        let a ="https://ebd.cda.pl/620x368/1238398896".lastIndexOf('/')
        let b ="https://ebd.cda.pl/620x368/1238398896".length
        let c ="https://ebd.cda.pl/620x368/1238398896"
    console.log(c.slice(a +1,b))//1238398896
    return (
        <div className="text-white flex flex-col justify-center items-center h-screen bg-cover" style={{ width: 'calc(100vw - 64px)'}}>
              <NavLink  to={useLocation().pathname.slice(0,useLocation().pathname.length - 2)} >
                "powrót"
            </NavLink>
            {data[0] ? <iframe className="w-[770px] h-[500px]" src={data[0].player} title="player" allowfullscreen frameborder="0" scrolling="no"/>
            : ""
    }
        </div>
    );
}

export default DescriptionEpisodes;
