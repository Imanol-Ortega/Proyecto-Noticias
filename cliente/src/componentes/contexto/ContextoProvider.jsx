/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AuthContext } from "./Context";
import { useContext, useEffect, useState } from "react";

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    
    return context;
};

export const AuthContextProvider = ({children})=>{

    const[user,setUser] = useState({
        user:"",
        nivel:''
    });

    const getUser = ()=>{
        const user= localStorage.getItem('user');
        const nivel =localStorage.getItem('nivel')
        
        setUser({
            user:user,
            nivel:nivel
        })
    }

    useEffect(()=>{
        getUser();
    },[])

    return (
        <AuthContext.Provider value={{user,getUser}}>
            {children}
        </AuthContext.Provider>
    );
}