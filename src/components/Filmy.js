import React from 'react';
import ItemAnime from './ItemAnime';

const Filmy = ({animeMovie}) => {
    const list = animeMovie.map((item,id) => { 
        return <ItemAnime item={item} key={id}/>
     })
     return (
         <div className='flex justify-center items-center flex-wrap'>
             {list}
         </div>
     );
}

export default Filmy;
