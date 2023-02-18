import { Web3Button } from '@web3modal/react'
import { ethers } from 'ethers'
import { Fragment, useEffect, useState } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'

import { Account } from '../components'
import { ChainSwitch } from '../components/ChainSwitch'
import FileForm from '../components/fileForm'
import { Pool } from '../components/Pool'
import Table from '../components/Table'
import { resonateABI, resonateAddress, useResonate } from '../generated'
import { client } from '../wagmi'

async function getPoolIds(provider: ethers.providers.Provider): Promise<string[]> {
    const con = new ethers.Contract(resonateAddress, resonateABI, provider)
    const events = await con.queryFilter(con.filters.PoolCreated())
    return events.map((event) => event.args?.poolId)
}


function Form() {
    const [project, setProject] = useState({ name: '', location: '', description: '' });
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        console.log('submit', project);
        // Submit the form or do something else with the project data
        }
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProject((prevState) => ({ ...prevState, [name]: value }));
    };
    
    return (
        <div>
            <h1>ASUFHLIUSDf</h1>
        <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Name"
        />
        <input
            type="text"
            name="location"
            value={project.location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Location"
        />
        <input
            type="text"
            name="description"
            value={project.description}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Description"
        />
        <button className="bg-blue-500 text-white font-bold rounded px-4 py-1.5" onClick={() => console.log('submit', project)}>
            Enter
        </button>
        <FileForm/>
        </div>
    );
        
    }

export default Form
