import { useEffect, useState } from "react";
import { getGruposRequest } from "../api/grupos.api"
import { Link } from "react-router-dom";

function VistaGrupos() {

    const [grupos,setGrupos] = useState([]);

    const obtenerGrupos = async()=>{
        try {
            const rp = await getGruposRequest();
            setGrupos(rp.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        obtenerGrupos();
    },[])


  return (
    <div className="h-screen font-sans bg-cover">
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
            <div className="w-full max-w-lg">
                <div className="">
                    <div className="flex flex-row justify-between">
                        <h1 className="mb-8">
                            GRUPOS
                        </h1>
                        <div className="block relative"> 
                                    <Link to='/grupos/nuevo' className='px-3 py-1 text-white font-light tracking-wider bg-green-700 hover:bg-green-600 rounded text-lg -ml-10 mr-2'>Agregar</Link>                      
                        </div>
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
                            {grupos.map((grupo)=>(
                                <tr className="flex w-full mb-4" key={grupo.id}>
                                    <td className="p-4 w-1/3">{grupo.id}</td>
                                    <td className="p-4 w-1/3">{grupo.grupo}</td>
                                    <td className="p-4 w-1/3">
                                    <Link to={`/grupos/editar/${grupo.id}`} className='px-3 py-1 text-white font-light tracking-wider bg-blue-600 hover:bg-blue-500 rounded text-xs '>Editar</Link>
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

export default VistaGrupos