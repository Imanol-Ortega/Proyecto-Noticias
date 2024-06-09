/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useForm} from 'react-hook-form'
import {  toast } from "react-hot-toast"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { postComentarioRequest } from '../api/comentarios.api';
import { useEffect } from 'react';
import { useAuth } from '../../../componentes/contexto/ContextoProvider';

function FormComentario({autor,noticia}) {
    const {user} = useAuth()
    const {register,handleSubmit,reset, formState : {errors},setValue } = useForm();
    
    const navigate = useNavigate();
    const params = useParams();

    const submit = handleSubmit( async data=> {
        
        try {
            const formData = {
                ...data,
                autor:autor,
                noticia:noticia
            }
            if(user.nivel=="LECTOR"){
                navigate('/login')
                
            }else{
                await postComentarioRequest(formData)
                toastSucess();
                reset();
            }
 
        } catch (error) {
            console.log(error)
        }
        
    })

    const toastSucess = () =>{
        toast.success("Comentario en espera de validación",{
            position: "top-right",
            autoClose: 5000,
            style: {
                background: "#212121",
                color: 'white'
            },
        });
    };

 



  return (  
        <div className="flex mx-auto items-center justify-center shadow-lg mb-2 w-full">

            <form 
                onSubmit={submit} 
                className="w-full max-w-xl bg-white rounded-lg px-4 pt-2" 
                >
                    <p 
                    className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                    Agregar Comentario
                    </p>

                    <div className="w-full md:w-full px-3 mb-2 mt-2">
                        <textarea 
                        className="text-blue-950 bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" 
                        placeholder='Escribe un Comentario'
                        {...register('cuerpo')} 
                        ></textarea>
                    </div>
                            
                    <div className="w-full flex items-start md:w-full px-3">
                        <button 
                        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                        type="submit"
                        >Comentar</button>
                    </div>
            </form>
        </div>
  )
}

export default FormComentario