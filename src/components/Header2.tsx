import React, { useEffect, useState } from 'react';
import { Web3Button } from '@web3modal/react'
import Link from 'next/link';

const header = () => {

    // const navigate = useNavigate(); 
    // const routeChange = () => { 
    //     let path = `newPath`; 
    //     navigate(path);
    // }
    return(

            <nav>
                <div className="flex justify-between bg-gray-900 p-4 h-16">
                    <button onClick={event =>  window.location.href='/'} className="text-white font-bold rounded-full bg-blue-500 text-white px-4 py-1.7 mx-4">
                        All Projects
                    </button>
                    <Link href="/my-projects" passHref>
                    <button className="text-white font-bold rounded-full bg-blue-500 text-white px-4 py-1.7 mx-4">My Projects</button>
                    </Link>
                    <button onClick={event =>  window.location.href='/create-new-project'} className="text-white font-bold rounded-full bg-blue-500 text-white px-4 py-1.7 mx-4">
                       Create New Project
                    </button>
                    <button onClick={event =>  window.location.href='/get-worker-nft'} className="text-white font-bold rounded-full bg-blue-500 text-white px-4 py-1.7 mx-4">
                       Get Worker NFT
                    </button>
                    <div className='flex items-center'>
                        <Web3Button/>
                    </div>
                </div>
            </nav>

    );
}


export default header;