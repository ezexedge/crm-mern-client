import React ,{useState,useEffect,useContext,Fragment} from 'react'
import {Link , withRouter } from 'react-router-dom'
import Producto from './Producto'
import Spinner from '../layout/Spinner'

import clientesAxios from '../config/axios'
import { CRMContext } from '../../context/CRMContext'


const Productos = (props) => {


    const [productos , guardarProductos] = useState([])

    const [ auth , guardarAuth ] = useContext( CRMContext )


    //consultamos la api
//cuando carge
    useEffect( ()=> {
        if(auth.token !== '') {

            const consultarAPI = async() => {
                try {
                    const productosConsulta = await clientesAxios.get('/productos',{
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    })
                    guardarProductos(productosConsulta.data)
                } catch (error) {
                    //si hay error sera por que el token ya expiro
                    if(error.response.status  === 500){
                        props.history.push('/iniciar-sesion')
                    }
                }
            }
    
            consultarAPI()

        }else{

            props.history.push('/iniciar-sesion')

        }

     
//cuando productos cambie se debera actualizar nuevamente
    },[productos])

    if(!auth.auth){
        props.history.push('/iniciar-sesion')

    }
//si productos es cero me retorna el espiner hasta que cargue
    if(!productos.length) return <Spinner/>

    return ( 
        <Fragment>

<h2>Productos</h2>

<Link to={'/productos/nuevo'} class="btn btn-verde nvo-cliente"> <i class="fas fa-plus-circle"></i>
    Nuevo Producto
</Link>
<ul className="listado-productos">

            {productos.map(producto=>(
                    <Producto
                    key={producto._id}
                    producto={producto}
                    />
            ))}
            
            </ul>

        </Fragment>
     );
}
 
export default Productos;