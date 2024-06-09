
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexto/ContextoProvider"

function Navbar() {
    const {user} = useAuth()
    const navigate = useNavigate()
    const logoutHandler = ()=>{
        localStorage.clear()
        navigate('/login')
    }
  return (
    <div className="bg-neutral-950 rounded-md flex justify-end px-2 py-2 w-full border-2 border-red-400 fixed text-xs z-50">
        <ul className="flex gap-x-2">
            <li>
            <Link 
            to="/noticias/lista" 
            className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1"
            >
                Noticias
            </Link>
            </li>

            { user.nivel=="AUTOR" || user.nivel == "ADMIN" && <>

                <li>
                    <Link 
                    to="/grupos/lista" 
                    className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1"
                    >
                        Grupos
                    </Link>
                </li>

                <li>
                    <Link 
                    to="/comentarios/validar" 
                    className="focus:outline-none focus:ring focus:ring-red-600 bg-slate-200 text-gray-700 rounded px-2 py-1"
                    >
                        Validar Comentario
                    </Link>
                </li>
            </>
            }
            <li>
            {user.user && 
                <button type="submit" onClick={logoutHandler} className=" -mt-2 focus:outline-none focus:ring focus:border-blue-400 bg-slate-200 text-gray-700 rounded px-2 py-1">
                                Logout
                </button>
            }    
            </li>       
            <li>
                { !user.user && <Link to="/login" className="focus:outline-none focus:ring focus:border-blue-400 bg-slate-200 text-gray-700 rounded px-2 py-1">Iniciar Sesión</Link> }
            </li>
        </ul>
    </div>
  )
}

export default Navbar