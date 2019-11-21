import React , {useEffect,useState,useContext,Fragment} from 'react';
import clientesAxios from '../config/axios'
import Cliente from './Cliente'
import {Link ,withRouter} from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { CRMContext } from '../../context/CRMContext'

const Clientes = (props) => {

    const  [clientes, guardarClientes] = useState([])

    //utilizamos los valores de context
    const [ auth , guardarAuth ] = useContext( CRMContext )


 

    //no es bueno usar en useEffect async await por eso lo ponemos por medio de una funcion aparte

    useEffect ( () => {


        if(auth.token !== ''){

            const consultarApi = async () => {

                try{
                    const clienteConsulta = await clientesAxios.get('/clientes',{
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    })
                    guardarClientes(clienteConsulta.data.clientes)
                    

                }catch(error){
                    if(error.response.status  === 500){
                        props.history.push('/iniciar-sesion')
                    }
                } 

              
            }



        
        consultarApi()
        }else{
            props.history.push('/iniciar-sesion')
        }


    },[clientes])


    //si el state esta como false
    //auth tiene 2 estados falso y true
    if(!auth.auth){ 

            props.history.push('iniciar-sesion')

    }
    //cuando clientes cambie va a funcionar
    //de esta forma me carga cuando elimino a una persona

    if(!clientes.length)return <Spinner/>


    return ( 
        <Fragment>
            <h2>Clientes</h2>
                <Link to={"/clientes/nuevo"} class="btn btn-verde nvo-cliente"> <i class="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-cliente">
               {clientes.map(cliente=>(
                   <Cliente
                   key={cliente._id}
                   cliente={cliente}
                   />
    ))}
            </ul>
            
        </Fragment>
     );
}
 
export default withRouter( Clientes);