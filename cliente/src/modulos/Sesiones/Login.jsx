/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useForm} from 'react-hook-form'
import {  toast } from "react-hot-toast"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loginUsuarioRequest } from './api/usuarios.api';
import { useAuth } from '../../componentes/contexto/ContextoProvider';

function Register() {

    const {register,handleSubmit, formState : {errors},setValue } = useForm();
    const {getUser} = useAuth()
    const navigate = useNavigate();

    const submit = handleSubmit( async data=> {
        try {
            const rp = await loginUsuarioRequest(data);
            localStorage.setItem('user',rp.data[0].usuario)
            localStorage.setItem('nivel',rp.data[0].nivel)
            getUser()
            toastSucess();
            navigate('/')
        } catch (error) {
            toastError()
           console.log(error)
        }
        
    })

    const toastSucess = () =>{
        toast.success("Iniciado Correctamente",{
            position: "top-right",
            autoClose: 5000,
            style: {
                background: "#212121",
                color: 'white'
            },
        });
    };

    const toastError = ()=>{
        toast.error('Contraseña o usuario incorrectos',{
            position: "top-right",
            autoClose: 5000,
            style: {
                background: "#212121",
                color: 'white'
            },
        })
    }

    



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
                            Iniciar Sesión
                            </p>

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

                            

                            <button 
                            className="px-4 py-1 mt-4 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                            type="submit"
                            >Iniciar Sesion</button>
                            <Link to='/registrar'  className=" ml-2 px-4 py-2 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded">Registrarse</Link>

                      </form>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Register