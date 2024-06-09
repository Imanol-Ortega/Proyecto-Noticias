import axios from "axios"

export const getComentariosRequest = async()=>{
    return await axios.get('http://127.0.0.1:8000/noticias/api/comentarios/')
}

export const getComentarioRequest = async(id)=>{
    return await axios.get(`http://127.0.0.1:8000/noticias/api/comentarios/${id}/`)
}

export const postComentarioRequest = async(values)=>{
    return await axios.post('http://127.0.0.1:8000/noticias/api/comentarios/',values)
}

export const putComentarioRequest = async(id,values)=>{
    return await axios.put(`http://127.0.0.1:8000/noticias/api/comentarios/${id}/`,values)
}

export const dltComentarioRequest = async(id)=>{
    return await axios.delete(`http://127.0.0.1:8000/noticias/api/comentarios/${id}/`)
}

export const getComentarioNoticiaRequest = async(values)=>{
    return await axios.post('http://localhost:8000/noticias/api/comentarios/comentario/',values)
}

export const getComentarioVisibleRequest = async()=>{
    return await axios.get('http://localhost:8000/noticias/api/comentarios/aprobar/')
}

