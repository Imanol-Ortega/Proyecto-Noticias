/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { Outlet  } from "react-router-dom";
import Unautorized from './Unauthorized'
import { useAuth } from "../../componentes/contexto/ContextoProvider";



function Authorization() {
    const {user} = useAuth()

        if(user.nivel == 'ADMIN' || user.nivel == 'AUTOR'){
            return <Outlet/> 
        }else{
            return <Unautorized />
        }
    
}

export default Authorization