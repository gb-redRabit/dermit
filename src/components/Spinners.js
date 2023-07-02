import React from 'react';
import {  useLocation } from 'react-router-dom';

const Spinners = (props) => {

console.log(useLocation().pathname) 

    return (
        <div className="text-white flex justify-center items-center w-full">
        {useLocation().pathname}
        </div>
    );
}

export default Spinners;
