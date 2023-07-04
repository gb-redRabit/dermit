/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {  useLocation } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { useState,useEffect} from 'react';
import LinkEpisodes from './LinkEpisodes';
const {ipcRenderer} = window.require("electron");
const DescriptionAnime = () => {

    const [data, setData] = useState({ hits: [] }); 
    const [list, setList] = useState([]); 
    let episodes= [];
    const slug = useLocation().pathname.slice(7,useLocation().pathname.length);

    useEffect(() => {
      ipcRenderer.send('getAnime', slug);
      ipcRenderer.on('onAnime', (e, d) => {
        setData(JSON.parse(d))
      })
    },[]);
 
    useEffect(() => {
        if(list.length !== data.episodes){
        for(let i= 1; i <= data.episodes;i++){
            ipcRenderer.send('getEpisodes', `${slug}/${i}`);
            ipcRenderer.on('onEpisodes', (e, d) => {
            if((episodes.length <= data.episodes) && (JSON.parse(d)[0] !== undefined) ){                
                if( i === JSON.parse(d)[0].anime_episode_number ){
                episodes[i -1] =  JSON.parse(d);
                setList([...episodes])
                }
            }
             })
        }
    }
    });
   
    return (
        <div className="text-white flex flex-col justify-center items-center min-h-screen bg-cover" style={{backgroundImage: `url(${data.bg})`, maxWidth: 'calc(100vw - 64px)', width: 'calc(100vw - 64px)'}}>
            <NavLink  to={useLocation().pathname.slice(0,6)} >
                "powrót"
           </NavLink>
        <div>{useLocation().pathname}</div>
        <div className='flex justify-center items-center flex-wrap '>
            {list.map((items,id)=> <LinkEpisodes items= {items} key={id}/>)}
        </div>
        </div>
    );
}

export default DescriptionAnime;
