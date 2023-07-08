/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ItemAnime from './list/ItemAnime';
import { useState,useEffect} from 'react';
import Genres from './Genres';
import { useLocation} from 'react-router-dom'
import { IconContext } from "react-icons";
import { CgMenuGridR } from 'react-icons/cg';
import Breadcrumbs from './Breadcrumbs';
const Anime = ({animeTV}) => {
    const [genres, setGenres] = useState([]);
    const [genresDisplay, setGenresDisplay] = useState(true);
    const [flaga, setFlaga] = useState(true);
    const [data, setData] = useState(animeTV);
    const [text, setText] = useState([]);
    const [type, setTyp] = useState([]);
    let typ =[]
    let gen =[]
    const location = useLocation().pathname;
 
    useEffect(() => {
        animeTV.map((item,id) => { 
            gen = [...gen,...item.genres]
            gen =  Array.from(new Set(gen))
            setGenres(gen)
            
       return <ItemAnime item={item} key={id} />
    })
    },[])
    useEffect(() => {
        animeTV.forEach((item,id) => { 
            typ = [...typ,item.series_type]
            typ =  Array.from(new Set(typ))
            setTyp(typ)
    })
    },[])
    const searchInput =(e)=>{
        setText(e.target.value.toLowerCase())
        setData(animeTV.filter(word=> word.title.toLowerCase().includes(text)))
    }
    const displayGenres=()=>{
        setGenresDisplay(!genresDisplay);
    }
    function changeBackground(e) {
        e.target.style.color = '#728a0b';
      }
      function changeBackground2(e) {
        e.target.style.color = 'white';
      }

      const clickBackground = (e) => {
        document.querySelectorAll('#sort button').forEach(item =>{
            item.style.color = 'rgb(255, 255, 255)';
        })
        if( e.target.style.color === 'rgb(114, 138, 11)')
        e.target.style.color = 'rgb(255, 255, 255)'
        else
        e.target.style.color = 'rgb(114, 138, 11)'
      }
      const clickGenres =(e)=>{
        document.querySelectorAll('button').forEach(item =>{
            item.style.color = 'rgb(255, 255, 255)';
        })
        setData(animeTV.filter(word=> [...word.genres].includes(e.target.innerText)))
        document.querySelector("select").value = "all"
        document.querySelectorAll('#genres button').forEach(item =>{
            item.style.color = 'rgb(255, 255, 255)';
        })
        if( e.target.style.color === 'rgb(114, 138, 11)')
        e.target.style.color = 'rgb(255, 255, 255)'
        else
        e.target.style.color = 'rgb(114, 138, 11)'
      }
      const sortAz = (e) => {
        if(flaga)
        {setData([...data].sort((a,b) =>  b.title.localeCompare(a.title)))
            e.target.innerText ="Z-A"
            setFlaga(!flaga)
        }
        else
       { setData([...data].sort((a,b) =>  a.title.localeCompare(b.title)))
        e.target.innerText ="A-Z"
        setFlaga(!flaga)}

      }

      const sortData = (e) =>{
        if(flaga)
        { setData([...data].sort((a,b) => new Date(a.aired_from) - new Date(b.aired_from)))
            e.target.innerText ="Od najstarszych"
            setFlaga(!flaga)
        }
        else
       {  setData([...data].sort((a,b) => new Date(b.aired_from) - new Date(a.aired_from)))
        e.target.innerText ="Od najnowszych"
        setFlaga(!flaga)}
      }

      const selectType =(e)=>{
        document.querySelectorAll('button').forEach(item =>{
            item.style.color = 'rgb(255, 255, 255)';
        })
        if("all"=== e.target.value)
        setData(animeTV)
        else
        setData(animeTV.filter(word=>word.series_type === e.target.value))
      }
    return (
        <div className='flex  flex-col justify-start items-start flex-wrap  min-h-screen w-[80vw] mx-auto' style={{ maxWidth: 'calc(100vw - 81px)'}}>
            <Breadcrumbs bcHome={true} bcTyp={location.slice(1,6)} bcTitle={false} bcEpisodes={false}/>
            <div className='flex justify-between items-center text-white bg-slate-900 w-full p-4 rounded my-10'>
                <div>
                    <h1 className="text-xl font-medium">Lista anime</h1>
                    <div className='flex gap-1 my-3' id="sort">
                    <button onClick={(e)=> {clickBackground(e); sortAz(e)}} className='text-sm flex justify-center items-center p-2  bg-gray-950 rounded text-white  text-center  cursor-pointer'>A-Z</button>
                    <button onClick={(e)=> {clickBackground(e); sortData(e)}} className='text-sm flex justify-center items-center p-2 bg-gray-950 rounded text-white  text-center cursor-pointer'>Od najnowszych</button>
                    </div>
                </div>
                    <input type="search" name="search" value={text} placeholder='szukaj...'  className='h-14 w-4/12 block py-2 px-2 text-xl text-gray-500 bg-gray-950 border-0 border-b-2 border-gray-500 appearance-none rounded' onChange={searchInput}/>
                    <button onClick={displayGenres} className='hover:text-yellow-500'>
                        <IconContext.Provider value={{ className: "text-4xl" }}>
                            <CgMenuGridR />
                        </IconContext.Provider>
                    </button>
            </div>
            <div className='mb-10 flex bg-slate-900 w-full rounded transition-all duration-300 ease-linear overflow-hidden overflow-y-hidden' style={genresDisplay?{ height: "0px"}:{  height: "200px"}}>
                <div className='flex flex-col w-4/5 gap-4 my-4 ml-4'>
                    <h1 className="text-xl font-medium text-white">Tagi</h1>
                    <div className='flex flex-row flex-wrap  gap-2' id="genres">
                        {genres.map((text,id) => <Genres text={text} click={clickGenres} key={id} />)}  
                    </div> 
                </div>
                <div className='flex flex-col w-1/5 gap-4 ml-5 mt-4'>
                    <h1 className="text-xl font-medium text-white">Rodzaj</h1>
                    <div className='flex flex-row flex-wrap h-full gap-2'>
                        <select onChange={selectType} className='h-14 w-4/5 block py-2 px-2 text-xl text-gray-500 bg-gray-950 border-0 border-b-2 border-gray-500 appearance-none rounded'>
                            <option value="all">Każdy</option>
                            {type.map((item,id) => <option key={id} value={item}>{item}</option>)}
                        </select>
                    </div>  
                </div>
            </div>
            <div className='flex  justify-center items-center flex-wrap '>
                {data.map((item,id) => <ItemAnime item={item} key={id}/>)}
            </div>  
        </div>
    );
}

export default Anime;
