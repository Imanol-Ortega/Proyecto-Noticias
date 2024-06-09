import axios from "axios"

export const getGruposRequest = async()=>{
    return await axios.get('http://127.0.0.1:8000/noticias/api/grupos/')
}

export const getGrupoRequest = async(id)=>{
    return await axios.get(`http://127.0.0.1:8000/noticias/api/grupos/${id}/`)
}

export const postGrupoRequest = async(values)=>{
    return await axios.post('http://127.0.0.1:8000/noticias/api/grupos/',values)
}

export const putGrupoRequest = async(id,values)=>{
    return await axios.put(`http://127.0.0.1:8000/noticias/api/grupos/${id}/`,values)
}

export const dltGrupoRequest = async(id)=>{
    return await axios.delete(`http://127.0.0.1:8000/noticias/api/grupos/${id}/`)
}
