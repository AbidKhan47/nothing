import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

const Sidebar = ({supabase}) => {
    return (
        <div className="flex flex-col h-full w-44 bg-gray-500 fixed left-0 top-0 bottom-0">
            <div className="p-4 mt-20 flex flex-col ">
                <ul>
                    <li className="py-2 mb-4 text-white text-lg"><Link to="/home">Home</Link></li>
                    <li className="py-2 mb-4 text-white text-lg"><Link to="/create">Create a Crewmate!</Link></li>
                    <li className="py-2 mb-4 text-white text-lg"><Link to="/gallery">Crewmate Gallery</Link></li>
                </ul>
            </div>
            <img className="mt-72" src="src/sus/peeking.7c0ab599.png"/>
        </div>
    );
};

export default Sidebar;



