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
import { uploadImage, uploadProject } from '../lib/pinata/requests'
import { client } from '../wagmi'
import axios from 'axios';
import { JWT } from '../lib/pinata/constants'
import Header from '../components/Header'
async function getPoolIds(provider: ethers.providers.Provider): Promise<string[]> {
    const con = new ethers.Contract(resonateAddress, resonateABI, provider)
    const events = await con.queryFilter(con.filters.PoolCreated())
    return events.map((event) => event.args?.poolId)
}


function UploadForm() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({ name: '', location: '', description: '' });
    const [project, setProject] = useState({ name: '', location: '', description: '', pictures: [""] });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        console.log("handling file chance", event)
        // Filter out unsupported file types
        const filteredFiles = selectedFiles ? Array.from<File>(selectedFiles).filter((file) =>
            file.type.startsWith('image/')
        ) : [];


        // Display error message for unsupported files
        const unsupportedFiles = selectedFiles ? Array.from<File>(selectedFiles).filter((file) =>
            !file.type.startsWith('image/')
        ) : [];
        if (unsupportedFiles.length) {
            alert(
                `The following files are not supported: ${unsupportedFiles
                    .map((file) => file.name)
                    .join(', ')}`
            );
        }

        // Update state with supported files
        setSelectedFiles(filteredFiles);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const picture_urls: string[] = [];
        await Promise.all(selectedFiles.map(async (file) => {
            const ipfs = await uploadImage(file)
            picture_urls.push(ipfs);
        }))
        const project_ipfs = await uploadProject({
            ...formData,
            pictures: picture_urls
        })

        // here is where the transaction will go.

        // Reset the form and clear the selected files
        setFormData({ name: '', location: '', description: '' });
        setProject({ name: '', location: '', description: '', pictures: [""] });
    };

    return (

        <div>
            <Header />
            <div>
                <h1>Enter Project Name Location, and </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="file" onChange={handleFileChange} multiple />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Location"
                        />
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UploadForm;
