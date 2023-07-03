import { useState,useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import DescriptionAnime from './list/DescriptionAnime';
import Home from './Home';
import Anime from './Anime';
import Filmy from './Filmy';
import Galeria from './Galeria';
import DescriptionEpisodes from './episodes/DescriptionEpisodes';

const {ipcRenderer} = window.require("electron");

function App() {

  const [dataAnime, setDataAnime] = useState({ hits: [] }); 
 
  useEffect(() => {
    ipcRenderer.send('start', "api");
    ipcRenderer.on('startOn', (e, d) => {
      setDataAnime(JSON.parse(d))
    })
  },[]);
  
  let animeTV;
  let animeMovie;
  if(dataAnime.length >2 ){
    animeTV = dataAnime.filter(item => item.series_type !== "Movie").map(item => item);
    animeMovie = dataAnime.filter(item => item.series_type === "Movie").map(item => item);
  }
  return (
    dataAnime ? <div className="flex min-h-screen">
      <Nav/>
    <div className="bg-slate-950 pl-16 flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Home dataAnime={dataAnime}/>} />
        <Route path="/anime" element={<Anime animeTV={animeTV}/>} />
        <Route path="/movie" element={<Filmy animeMovie={animeMovie}/>} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/anime/:id" element={<DescriptionAnime/>} />
        <Route path="/movie/:id" element={<DescriptionAnime/>} />
        <Route path="/anime/:id/:id" element={<DescriptionEpisodes/>} />
        <Route path="/movie/:id/:id" element={<DescriptionEpisodes/>} />
        
      </Routes>
    </div>
  </div>
  : 
 <></>
  );
}

export default App;