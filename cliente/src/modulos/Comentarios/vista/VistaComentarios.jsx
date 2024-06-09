/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getComentarioVisibleRequest, putComentarioRequest, dltComentarioRequest } from "../api/comentarios.api";
import moment from 'moment';

function VistaComentarios() {
    const [comentarios, setComentarios] = useState([]);

    const obtenerComentarios = async()=>{
        try {
            const rp = await getComentarioVisibleRequest();
            setComentarios(rp.data)
        } catch (error) {
            console.log(error)
        }
    }

    const aprobarComentario = async(id,values)=>{
        try {
            const rp = await putComentarioRequest(id,values);
            setComentarios(comentarios.filter(fill=>fill.id !=id));
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        obtenerComentarios();
    },[])

  return (
    <div className="h-screen font-sans bg-cover">
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
            <div className="w-full max-w-lg">
                <div className="">
                    <div className="flex flex-row justify-between">
                        <h1 className="mb-8">
                            Comentarios
                        </h1>
                        
                    </div>
                    <table className="text-left w-full">
                        <thead className="bg-slate-700 flex text-white w-full">
                            <tr className="flex w-full mb-4 h-10">
                                <th className="p-4 w-1/3">ID</th>
                                <th className="p-4 w-1/3">GRUPO</th>
                                <th className="p-4 w-1/3">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full">
                            {comentarios.map((comentario)=>(
                                <tr className="flex w-full mb-4" key={comentario.id}>
                                    <td className="p-4 w-1/3">
                                    <Link to={`/noticias/lista/${comentario.noticia}`}>
                                        {comentario.id}
                                    </Link>
                                    </td>
                                    <td className="p-4 w-1/3">{comentario.cuerpo}</td>
                                    <td className="p-4 w-1/3">
                                    <div className="text-right -ml-10"> 
                                    <button onClick={()=>aprobarComentario(comentario.id,
                                        {
                                            "id": comentario.id,
                                            "cuerpo": comentario.cuerpo,
                                            "fecha": comentario.fecha,
                                            "visible": true,
                                            "autor": comentario.autor,
                                            "noticia": comentario.noticia
                                        }
                                    )}
                                    className='px-3 py-1 text-white font-light tracking-wider bg-blue-600 hover:bg-blue-500 rounded text-xs '
                                    >
                                        Aprobar
                                    </button>

                                    <button 
                                    onClick={()=>{
                                        dltComentarioRequest(comentario.id)
                                        setComentarios(comentarios.filter(fill=>fill.id !=comentario.id));
                                    }}
                                    className='px-3 py-1 text-white font-light tracking-wider bg-red-700 hover:bg-red-600 rounded text-xs ml-1'
                                    >Eliminar</button>
                                    </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VistaComentarios