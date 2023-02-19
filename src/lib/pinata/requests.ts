import { JWT, PINATA_BASE_URL, SingleImageResponse, SingleJSONResponse } from "./constants"
import axios from "axios";
import { Project } from "./constants";


export const uploadImage = async (file: File): Promise<string> => {
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/upload/image", {
        method: "POST",
        body
    });
    const data = await response.json() as SingleImageResponse;
    console.log(data)
    return data.ipfsHash;
}

export const uploadProject = async (project: Project): Promise<string> => {
    console.log("1", JSON.stringify(project))
    const response = await fetch("/api/upload/json", {
        method: "POST",
        body: JSON.stringify(project)
    });
    const data = await response.json() as SingleJSONResponse;
    console.log("req", data)
    return data.IpfsHash;
}

