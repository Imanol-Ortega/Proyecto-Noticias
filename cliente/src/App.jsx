/* eslint-disable react-hooks/exhaustive-deps */

import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import FormGrupo from './modulos/Grupos/formulario/FormGrupo'
import VistaGrupos from './modulos/Grupos/vista/VistaGrupos'
import NotFound from './componentes/NotFound/NotFound'
import FormNoticia from './modulos/Noticias/formulario/FormNoticia'
import VistaNoticias from './modulos/Noticias/vista/VistaNoticias'
import CardNoticia from './modulos/Noticias/card/CardNoticia'
import VistaComentarios from './modulos/Comentarios/vista/VistaComentarios'
import Register from './modulos/Sesiones/Register'
import Login from './modulos/Sesiones/Login'
import Authorization from './modulos/Sesiones/Authorization'
import Navbar from './componentes/NavBar/Navbar'
import { AuthContextProvider } from './componentes/contexto/ContextoProvider'

function App() {


  return (
    <div className='h-screen  bg-zinc-950 text-blue-50'>
      <div className="mx-auto h-full">

      <AuthContextProvider>

        <Navbar/>

        <Routes>
            <Route path="*" element={<NotFound/>}></Route>

            <Route path="/" element={<Navigate to='/noticias/lista' />} />

            <Route path='/login' element={<Login />} />
            <Route path='/registrar' element={<Register/>} />


            <Route element={<Authorization />}>
              <Route path='/grupos/nuevo' element={<FormGrupo/>} />
              <Route path='/grupos/editar/:id' element={<FormGrupo/>} />
              <Route path='/grupos/lista' element={<VistaGrupos/>} />
              <Route path='/noticias/nuevo' element={ <FormNoticia/> } />
              <Route path='/noticias/editar/:id' element= {<FormNoticia/>} />
              <Route path='/comentarios/validar' element={<VistaComentarios />} />
            </Route>

            


            
            <Route path='/noticias/lista' element={ <VistaNoticias/>} />
            <Route path='/noticias/lista/:id' element = { <CardNoticia/>} />

            


        </Routes>

        <Toaster/>
        </AuthContextProvider>
      </div>
      
    </div>
  )
}

export default App
