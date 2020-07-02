import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const create = personObj => {
    const req = axios.post(baseUrl, personObj)
    return req.then(response => response.data)
}

const deleteObj = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(response => response.data)   
}

const updateNum = (id, newObj) => {
    const req = axios.put(`${baseUrl}/${id}`, newObj)
    return req.then(response => response.data)
}

export default {getAll, create, deleteObj, updateNum}