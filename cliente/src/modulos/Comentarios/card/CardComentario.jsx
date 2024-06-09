/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import moment from 'moment';
import { getComentarioNoticiaRequest } from "../api/comentarios.api";

function CardComentario({noticia,autor}) {

    const [comentarios,setComentarios] = useState([]);

    const obtenerComentarios = async()=>{
        try {
            if(noticia){
                const rp = await getComentarioNoticiaRequest({noticiaid:noticia});
                console.log(rp.data)
                setComentarios(rp.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        obtenerComentarios();
    },[])

  return (
    <div>
        {
            comentarios.map((comentario)=>(
        <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg text-blue-950" key={comentario.id}>
            <div className="relative flex gap-4">
                
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between">
                        <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">{autor}</p>
                    </div>
                    <p className="text-gray-400 text-sm">{moment(comentario.fecha).format('DD MMMM YYYY')}</p>
                </div>
            </div>
            <p className="-mt-4 text-gray-500">{comentario.cuerpo}</p>
        </div>
    ))}

    </div>
  )
}

export default CardComentario