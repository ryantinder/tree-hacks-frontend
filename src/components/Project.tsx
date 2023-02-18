import React, { useEffect, useState } from 'react';
type ActualTableProps = {
    address: string
}

interface Project {
    Name: string;
    Location: string;
    Description: string;
    pictures: string[];
};


const Project: React.FC<ActualTableProps> = ({ address }) => {
    async function join() {
        console.log("joining with my NFT");
    }

    async function donate() {
        console.log("Going to donate some money");
    }

    async function admin() {
        console.log("going to manage the project");
    }
    

    const [project, setProject] = useState<Project>();
    // So you now have a address object passed into this component
    // eventually its going to say readJSONString(address)

    // fetch() that content from the json_string

    // cast it into a Project object
    // then you can render it
    // const project: Project = {

    // }
    useEffect(() => {
        const fetchProject = async () => {
            const json_string = 'https://shuttle-9.estuary.tech/gw/ipfs/bafkreicffpxbqxni5qdthwigzrz7jz6nffdzv3thi762xxiqgaqstiuygu/'
            const response = await fetch(json_string);
            const data = await response.json() as Project;
            console.log(data)
            setProject(data);
        }
        fetchProject().then().catch(console.error);
    }, [])

    return (
        <div className="border border-solid border-gray-300 rounded-lg p-4 shadow-md bg-white mx-auto mx-4 mb-4">
            {project /*asserting that project is defined*/ &&
                <div>
                    <div className='flex center'>
                        <div className="mt-4 p-4">
                            <p className="mt-2">{project.Name}</p>
                        </div>
                        <div className="mt-4 p-4">
                            <p className="mt-2">{project.Description}</p>
                        </div>
                        <div className="mt-4 p-4">
                            <p className="mt-2">{project.Location}</p>
                        </div>
                        <div className="mt-4 p-4">
                            <div className='flex'>
                            {project.pictures.map((picture) => (
                                <img src={picture} key={picture} width={50} height={50} alt="prefix ignore"/>
                            ))}
                            </div>

                        </div>
                            
                    </div>
                        <div className = 'flex center'>
                            <button className = 'rounded-full bg-blue-500 text-white px-4 py-2 mx-4' style={{ backgroundColor: 'grey', color: 'white' }} onClick={join}>Join</button>
                            <button className = 'rounded-full bg-blue-500 text-white px-4 py-2 mx-4' style={{ backgroundColor: 'grey', color: 'white' }} onClick={donate}>Donate</button>
                            <button className = 'rounded-full bg-blue-500 text-white px-4 py-2 mx-4' style={{ backgroundColor: 'grey', color: 'white' }} onClick={admin}>Admin</button>
                        </div>
                   </div>
            }
        </div>
    );
};

export default Project;
