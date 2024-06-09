import axios from "axios"

export const getUsuariosRequest = async()=>{
    return await axios.get('http://127.0.0.1:8000/noticias/api/usuarios/')
}

export const getUsuarioRequest = async(id)=>{
    return await axios.get(`http://127.0.0.1:8000/noticias/api/usuarios/${id}/`)
}

export const postUsuarioRequest = async(values)=>{
    return await axios.post('http://127.0.0.1:8000/noticias/api/usuarios/',values)
}

export const putUsuarioRequest = async(id,values)=>{
    return await axios.put(`http://127.0.0.1:8000/noticias/api/usuarios/${id}/`,values)
}

export const dltUsuarioRequest = async(id)=>{
    return await axios.delete(`http://127.0.0.1:8000/noticias/api/usuarios/${id}/`)
}

export const loginUsuarioRequest = async(values)=>{
    return await axios.post('http://localhost:8000/noticias/api/usuarios/login/',values);
}