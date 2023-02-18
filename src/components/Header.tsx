import React, { useEffect, useState } from 'react';
import { Web3Button } from '@web3modal/react'
import { BrowserRouter, Link, Route, Routes, useNavigate} from 'react-router-dom';

const header = () => {

    // const navigate = useNavigate(); 
    // const routeChange = () => { 
    //     let path = `newPath`; 
    //     navigate(path);
    // }
    return(
        <BrowserRouter>
            <nav>
                <div className="flex justify-between bg-gray-900 p-4 h-16">
                    <button onClick={event =>  window.location.href='/'} className="text-white font-bold rounded-full bg-blue-500 text-white px-4 py-1.7 mx-4">
                        <Link to="./">All Projects</Link>
                    </button>
                    <button onClick={event =>  window.location.href='/my-projects'} className="text-white font-bold rounded-full bg-blue-500 text-white px-4 py-1.7 mx-4">
                        <Link to="/my-projects">My Projects</Link>
                    </button>
                    <button onClick={event =>  window.location.href='/create-new-project'} className="text-white font-bold rounded-full bg-blue-500 text-white px-4 py-1.7 mx-4">
                        <Link to="/create-new-project">Create New Project</Link>
                    </button>
                    <button onClick={event =>  window.location.href='/get-worker-nft'} className="text-white font-bold rounded-full bg-blue-500 text-white px-4 py-1.7 mx-4">
                        <Link to="/get-worker-nft">Get Worker NFT</Link>
                    </button>
                    <div className='flex items-center'>
                        <Web3Button/>
                    </div>
                </div>
            </nav>
        </BrowserRouter>  
    );
}


export default header;