/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNoticiaRequest } from "../api/noticias.api";
import { getUsuarioRequest } from "../../Sesiones/api/usuarios.api";
import FormComentario from "../../Comentarios/formulario/FormComentario";
import moment from 'moment';
import CardComentario from "../../Comentarios/card/CardComentario";

function CardNoticia() {

    const [noticias,setNoticias] = useState([]);
    const [autor,setAutor] = useState([]);
    const params = useParams()

    const obtenerAutores = async(id)=>{
        try {
            const rp = await getUsuarioRequest(id);
            setAutor(rp.data.nombre)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerNoticia = async()=>{
        try {
            const rp = await getNoticiaRequest(params.id);
            obtenerAutores(rp.data.id)
            setNoticias(rp.data)   
        } catch (error) {
            console.log(error)
        }
    }
    

    useEffect(()=>{
        obtenerNoticia();
    },[])

  return (
    <div>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-6 sm:py-12">
          <div className="m-10 flex flex-col items-center mx-auto ">
            
            <div className=" flex w-96 justify-center ">

              <div className="bg-white w-full rounded-lg shadow-md flex flex-col transition-all overflow-hidden hover:shadow-2xl" key={noticias.id}>
                
                <div className=" p-6">

                  <div className="pb-3 mb-4 border-b border-stone-200 text-xs font-medium flex justify-between text-blue-900">
                    <span className="flex items-center gap-1">
                      
                      {moment(noticias.fecha).format('DD MMMM YYYY')}
                    </span>
                    
                  </div>
                  <h3 className="mb-4 font-semibold text-sky-800 text-2xl">Autor : {autor}</h3>
                  <h2 className="mb-4 font-semibold text-sky-800 text-2xl">{noticias.titulo}</h2>
                  
                  <p className="text-sky-800 text-sm mb-0">
                    {noticias.cuerpo}
                  </p>
                </div>
                <div className="mx-auto mb-10">
                  <img src={noticias.imagen} alt="Imagen" className='object-scale-down h-32 w-32'/>
                </div>

                <FormComentario autor={noticias.autor} noticia={noticias.id}/>
                <CardComentario noticia={noticias.id} autor={autor}/>
              </div>
            
                
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default CardNoticia