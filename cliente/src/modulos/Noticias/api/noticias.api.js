import axios from "axios"

export const getNoticiasRequest = async()=>{
    return await axios.get('http://127.0.0.1:8000/noticias/api/noticias/')
}

export const getNoticiaRequest = async(id)=>{
    return await axios.get(`http://127.0.0.1:8000/noticias/api/noticias/${id}/`)
}

export const postNoticiaRequest = async(values)=>{
    return await axios.post('http://127.0.0.1:8000/noticias/api/noticias/',values)
}

export const putNoticiaRequest = async(id,values)=>{
    return await axios.put(`http://127.0.0.1:8000/noticias/api/noticias/${id}/`,values)
}

export const dltNoticiaRequest = async(id)=>{
    return await axios.delete(`http://127.0.0.1:8000/noticias/api/noticias/${id}/`)
}
