/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useForm} from 'react-hook-form'
import {  toast } from "react-hot-toast"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { postUsuarioRequest } from './api/usuarios.api';

function Register() {

    const {register,handleSubmit, formState : {errors},setValue } = useForm();
    
    const navigate = useNavigate();

    const submit = handleSubmit( async data=> {
        try {
            await postUsuarioRequest(data);
            toastSucess();
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
        
    })

    const toastSucess = () =>{
        toast.success("Se guardo Correctamente",{
            position: "top-right",
            autoClose: 5000,
            style: {
                background: "#212121",
                color: 'white'
            },
        });
    };




  return (
    <div>              
        <div className="h-screen font-sans bg-cover">
            <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                <div className="w-full max-w-lg">
                    <div className="leading-loose">

                        <form 
                        onSubmit={submit} 
                        className="max-w-sm p-10 bg-white bg-opacity-25 rounded shadow-xl" 
                        >
                            <p 
                            className="text-white text-center text-lg font-bold">
                            Registrarse
                            </p>

                            <label className="block text-sm text-white">Nombre</label>
                            <input
                            className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"  
                            type="text" 
                            placeholder='Nombre'
                            {...register('nombre', {required: true})}
                            />
                            {errors.nombre && <div className='text-red-500'>El campo esta vacio</div> }

                            <label className="block text-sm text-white">Usuario</label>
                            <input
                            className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"  
                            type="text" 
                            placeholder='Usuario'
                            {...register('usuario', {required: true})}
                            />
                            {errors.usuario && <div className='text-red-500'>El campo esta vacio</div> }

                            <label className="block text-sm text-white">Clave</label>
                            <input
                            className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"  
                            type="password" 
                            placeholder='Clave'
                            {...register('clave', {required: true})}
                            />
                            {errors.clave && <div className='text-red-500'>El campo esta vacio</div> }

                            
                            <label className="block text-sm text-white">Nivel</label>
                            <select  className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                            {...register('nivel', {required:true})}>
                                <option value="">Seleccione una Opcion</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="AUTOR">AUTOR</option>
                                <option value="LECTOR">LECTOR</option>
                            </select>

                            <label className="block text-sm text-white">Estado</label>
                            <select  className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                            {...register('estado', {required:true})}>
                                <option value="">Seleccione una Opcion</option>
                                <option value="ACTIVO">ACTIVO</option>
                                <option value="INACTIVO">INACTIVO</option>
                            </select>

                            <button 
                            className="px-4 py-1 mt-4 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                            type="submit"
                            >Guardar</button>
                            
                      </form>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Register