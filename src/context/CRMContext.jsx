import React , { useState ,useEffect} from 'react'
import {Link ,withRouter} from 'react-router-dom'

//al createContext le pasamos 2 parametros un objeto vicio y un arrow function osea una funcion
//el objeto es auth y la funcion seria guardarAuth
const CRMContext = React.createContext([{} , () => {} ])


const CRMProvider = (props) => {
    

    const  [auth , guardarAuth ] = useState({
        token: '',

        auth: false
    })

   
    

    

return(
//siguiendo el createCOntecxt tengo que poner el auth y el guardaToken
//el props.children se refiere que todos lo componentes heredan los value o el state que seria auth y guardarAuth



        <CRMContext.Provider value={[auth,guardarAuth]}>
    
                {props.children}

        </CRMContext.Provider>

)

} 


export { CRMContext , CRMProvider}




