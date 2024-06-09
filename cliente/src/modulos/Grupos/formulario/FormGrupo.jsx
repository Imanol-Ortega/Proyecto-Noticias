/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useForm} from 'react-hook-form'
import {  toast } from "react-hot-toast"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { postGrupoRequest, getGrupoRequest, putGrupoRequest } from '../api/grupos.api';
import { useEffect } from 'react';

function FormGrupo() {

    const {register,handleSubmit, formState : {errors},setValue } = useForm();
    
    const navigate = useNavigate();
    const params = useParams();

    const submit = handleSubmit( async data=> {
        try {
            if(params.id){
                await putGrupoRequest(params.id,data)
            }else{
                await postGrupoRequest(data);
            }
            toastSucess();
            navigate('/')
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

    const cargarGrupo = async(id)=>{
        try {
            const response = await getGrupoRequest(id);
            setValue('grupo',response.data.grupo)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(params.id){
            cargarGrupo(params.id);
        }
    },[])

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
                            Grupos
                            </p>

                            <label className="block text-sm text-white">Nombre</label>
                            <input
                            className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"  
                            type="text" 
                            placeholder='Grupo'
                            {...register('grupo', {required: true})}
                            />
                            {errors.grupo && <div className='text-red-500'>El campo esta vacio</div> }

                            <button 
                            className="px-4 py-1 mt-4 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                            type="submit"
                            >Guardar</button>
                            <Link to='/grupos/lista'  className=" ml-2 px-4 py-2 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded">Cancelar</Link>

                      </form>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default FormGrupo