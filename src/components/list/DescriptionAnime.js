/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {  useLocation } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { useState,useEffect} from 'react';
import LinkEpisodes from './LinkEpisodes';
import Genres from './../Genres';
const {ipcRenderer} = window.require("electron");
const DescriptionAnime = () => {

    const [data, setData] = useState({ hits: [] }); 
    const [list, setList] = useState([]); 
    const location = useLocation().pathname;

    let episodes= [];
    const slug = location.slice(7,location.length);
    console.log(data)
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
    function changeBackground(e) {
        e.target.style.color = '#728a0b';
      }
      function changeBackground2(e) {
        e.target.style.color = 'white';
      }
    return (
        <div className=" bg-cover flex justify-center  items-center relative z-[1] min-h-screen" style={{ maxWidth: 'calc(100vw - 81px)', width: 'calc(100vw - 81px)'}}>
            <div className="absolute top-0 right-0 left-0 h-[60vh] z-[-1] blur-[3px] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:content-[''] after:z-[0] after:bg-gradient-to-tl after:from-[rgba(0,0,0,0)] after:to-[rgba(0,0,0,1)]">
                <img src={data.bg ? data.bg: data.cover} alt= {data.bg} className='w-full h-full object-cover absolute '/>
            </div>
            <div className='flex flex-col justify-center items-center w-[80vw]'>
                <div className='flex flex-row justify-start gap-4  my-10  w-full'>
                    <NavLink  to="/" style={{ color: 'white', }}  onMouseEnter ={changeBackground} onMouseLeave={changeBackground2}>
                        Home
                    </NavLink>
                    <NavLink  to={location.slice(0,6)} style={{ color: 'white'}} onMouseEnter ={changeBackground} onMouseLeave={changeBackground2}>
                        Anime
                    </NavLink>
                    <NavLink  to={location} style={{ color: 'white'}} onMouseEnter ={changeBackground} onMouseLeave={changeBackground2}>
                        {data.title}
                    </NavLink>
                </div>
                <div className=" flex flex-row justify-start  my-10  w-full">
                    <img src={data.cover} alt={data.cover} className=" rounded-2xl "/>
                    <div className="w-3/5 ml-16 flex flex-col  items-start  text-white">
                        <div className='flex gap-3'>{data.genres ? data.genres.map((text,id) => <Genres text={text} key={id} />): "???"}</div>
                        <h1 className='text-3xl font-bold p-3'>{data.title}</h1>
                        <h2 className='text-2xl font-bold p-2'>{data.title_en === data.title ? "": data.title_en }</h2>
                        <p className='text-xl font-medium px-4 pt-10 text-slate-300'>Opis</p>
                        <p className='text-lg px-4 pt-5 text-slate-200'>{data.description}</p>
                    </div>
                    <div className="w-1/5 flex flex-col justify-center items-end text-white text-right">
                            <p className='p-2'>Informacje</p>
                            <p className='p-2'>Rodzaj: <span className="font-bold">{data.series_type}</span></p>
                            <p className='p-2'>Odcinki: <span className="font-bold">{data.episodes}</span></p>
                            <p className='p-2'>Sezon: <span className="font-bold">{`${data.season} ${data.season_year}`}</span></p>
                            <p className='p-2'>Emisji: <span className="font-bold">{data.aired_from ? data.aired_from.slice(0,10): "???"}</span></p>
                    </div>
                </div>
                <h2 className='text-white m-10 uppercase text-4xl'>Odcinki</h2>
                <div className='flex justify-center items-center flex-wrap w-full gap-7 mb-10'>
                    {list.map((items,id)=> <LinkEpisodes items= {items} key={id}/>)}
                </div>
            </div>
        </div>
    );
}

export default DescriptionAnime;
