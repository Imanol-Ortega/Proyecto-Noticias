/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useForm} from 'react-hook-form'
import {  toast } from "react-hot-toast"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { postNoticiaRequest, getNoticiaRequest, putNoticiaRequest } from '../api/noticias.api';
import { getGruposRequest } from '../../Grupos/api/grupos.api';
import { useEffect, useRef, useState } from 'react';

function FormNoticia() {

    

    const {register,handleSubmit, formState : {errors},setValue } = useForm();
    const [image, setImage] = useState(null);
    const [grupos,setGrupos] = useState([]);
    const imageRef = useRef(null);
    const navigate = useNavigate();
    const params = useParams();


   

    const submit = handleSubmit( async data=> {
        console.log(data)
        const base64Image = await toBase64(image);
        const formData = {
        ...data,
        imagen: base64Image,
        autor:4
        };
        console.log(formData);

        try {
            if(params.id){
                await putNoticiaRequest(params.id,formData)
            }else{
                await postNoticiaRequest(formData);
            }
            toastSucess();
            navigate('/noticias/lista')
        } catch (error) {
            console.log(error)
        }
        
    })

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setImage(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            imageRef.current.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };
    
      const toBase64 = async (file) => {
        const reader = new FileReader();
        const result = await new Promise((resolve, reject) => {
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
        return result;
      };
    

      const cargarGrupos = async()=>{
        try {
            const rp = await getGruposRequest();
            setGrupos(rp.data);
        } catch (error) {
            console.log(error)
        }
      }


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

    const cargarNoticia = async(id)=>{
        try {
            const response = await getNoticiaRequest(id);        
            setValue('titulo',response.data.titulo)
            setValue('cuerpo',response.data.cuerpo)
            setValue('grupo',response.data.grupo)
            setValue('autor',response.data.autor)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(params.id){
            cargarNoticia(params.id);
        }
        cargarGrupos();
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
                            Noticia
                            </p>

                            <label className="block text-sm text-white">Titulo</label>

                            <input
                            className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"  
                            type="text" 
                            placeholder='Titulo'
                            {...register('titulo', {required: true})}
                            />
                            {errors.titulo && <div className='text-red-500'>El campo esta vacio</div> }

                            <label className="block text-sm text-white">Cuerpo</label>

                            <textarea
                            rows={3}
                            className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"  
                            type="text" 
                            placeholder='Cuerpo'
                            {...register('cuerpo', {required: true})}
                            ></textarea>
                            {errors.cuerpo && <div className='text-red-500'>El campo esta vacio</div> }

                            <label className="block text-sm text-white">Imagen</label>
                            <input 
                            type="file" 
                            ref={imageRef} 
                            onChange={handleImageChange}
                            placeholder='Seleccionar Imagen' 
                            />

                            {image && <img ref={imageRef} alt="Imagen seleccionada" className='object-scale-down h-16 w-16'/>}

                            <label className="block text-sm text-white">Grupo</label>
                            <select  className="px-5 p-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                            {...register('grupo', {required:true})}>
                                <option value="">Seleccione una Opcion</option>
                                {
                                    grupos.map(grupo=>(
                                        <option value={grupo.id} key={grupo.id} className=" hover:bg-sky-700">{grupo.grupo}</option>
                                    ))

                                }
                            </select>

                            <div>
                                <button 
                                className="px-4 py-1 mt-4 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                type="submit"
                                >Guardar</button>
                                <Link to='/noticias/lista'  className=" ml-2 px-4 py-2 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded">Cancelar</Link>
                            </div>
                      </form>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default FormNoticia