import axios from "axios"


let httpOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
}

export const getAPI = async (url) => {
    buildRequestHeaders();
    return await axios.get(url, httpOptions)
}

export const postAPI = async (url, data)=> {
    return await axios.post(url, JSON.stringify(data), httpOptions)
}

export const postWithAuthAPI = async (url, data) => {
    buildRequestHeaders();
    return await axios.post(url, JSON.stringify(data), httpOptions)
}

export const putAPI = async (url, data) => {
    buildRequestHeaders();
    return await axios.put( url, JSON.stringify(data), httpOptions)
}

export const patchAPI = async (url, data) => {
    buildRequestHeaders();
    return await axios.put( url, JSON.stringify(data), httpOptions)
}

export const deleteAPI = async (url) => {
    buildRequestHeaders();
    return await axios.delete(url, httpOptions)
}

const buildRequestHeaders = () => {
    const token = localStorage.getItem("accessToken");
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'Authorization':` Bearer ${token}`
    };    
    httpOptions.headers = headers;
}

