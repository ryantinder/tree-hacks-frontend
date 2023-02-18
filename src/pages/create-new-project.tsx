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
import { uploadImage } from '../lib/pinata/requests'
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
  const [project, setProject] = useState({ name: '', location: '', description: '' });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
  
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

    // Create a FormData object to send the file to the API
    // const formData = new FormData();
    // selectedFiles.forEach((file) => formData.append('images', file));
    console.log("got this far");
    for (const file of selectedFiles) {
        console.log("trying to upload")
        const body = new FormData();
        body.append("file", file);
        const response = await fetch("/api/upload", {
          method: "POST",
          body
        });
        console.log((await response.text()))
    }
    return;
    // Send the form data to the API
    const response = await fetch('/api/upload_images', {
      method: 'POST',
      body: formData,
    });

    const locationImages = response.json;
    const formData2 = new FormData();
    //this will add the other fields that we need 
    // formData2.append('images', locationImages);
    // formData2.append('name', project.name);
    // formData2.append('location', project.location);
    // formData2.append('description', project.description);

    const response2 = await fetch('/api/upload_project', {
        method: 'POST',
        body: formData2,
    })


    const data = await response.json();
    console.log('Form submitted:', data);

    // Reset the form and clear the selected files
    setSelectedFiles([]);
    setFormData({ name: '', location: '', description: '' });
    setProject({ name: '', location: '', description: '' });
  };

  return (
    
      <div>
        <Header/>
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
