/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNoticiasRequest } from "../api/noticias.api";
import moment from 'moment';
import { useAuth } from "../../../componentes/contexto/ContextoProvider";

function VistaGrupos() {

    const {user} = useAuth();
    const [noticias,setNoticias] = useState([]);

    const obtenerNoticias = async()=>{
        try {
            const rp = await getNoticiasRequest();
            setNoticias(rp.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        obtenerNoticias();
    },[])


  return (
    <div >
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-6 sm:py-12">
          <div className="m-10 flex flex-col items-center mx-auto max-w-screen-lg">
            <div className="header flex w-full justify-between">
              <h2 className="font-black pb-10 mb-20 text-5xl text-blue-900 before:block before:absolute before:bg-sky-300  relative before:w-1/3 before:h-1 before:bottom-0 before:left-1/3">Noticias</h2>
             { user.nivel == "AUTOR" || user.nivel == "ADMIN" && <div className="block relative mb-10 "> 
                  <Link to='/noticias/nuevo' className='px-3 py-1 text-white font-light tracking-wider bg-green-700 hover:bg-green-600 rounded text-lg -ml-10 mr-2'>Agregar</Link>                      
              </div>}
            </div>
            
            <div className="grid w-full gap-10 grid-cols-3">

              {
                noticias.map((noticia)=>(
              <div className="bg-white w-full rounded-lg shadow-md flex flex-col transition-all overflow-hidden hover:shadow-2xl" key={noticia.id}>
                <Link to={`/noticias/lista/${noticia.id}`} className="transition-all text-blue-900 hover:text-blue-600">
                <div className="  p-6">

                  <div className="pb-3 mb-4 border-b border-stone-200 text-xs font-medium flex justify-between text-blue-900">
                    <span className="flex items-center gap-1">
                      
                      {moment(noticia.fecha).format('DD MMMM YYYY')}
                    </span>
                    
                  </div>
                  <h3 className="mb-4 font-semibold  text-2xl">{noticia.titulo}</h3>
                  <p className="text-sky-800 text-sm mb-0">
                    {noticia.cuerpo}
                  </p>
                </div>
                <div className="mt-auto">
                  
                </div>
                </Link>
              </div>
              ))
              }

            </div>
          </div>
        </div>
    </div>
  )
}

export default VistaGrupos