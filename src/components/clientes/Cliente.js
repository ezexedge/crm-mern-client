import React,{useContext} from 'react';

import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import clientesAxios from '../config/axios'
import { CRMContext } from '../../context/CRMContext'


const Cliente = ({cliente}) => {
    const [ auth , guardarAuth ] = useContext( CRMContext )


    const { _id , nombre , apellido , empresa , email , telefono } = cliente

    //eliminar cliente
    const eliminarCliente = idCliente => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {

                clientesAxios.delete(`/clientes/${idCliente}`,{
                    headers: {
                        Authorization : `Bearer ${auth.token}`
                    }
                })
                    .then(res=>{
                        console.log(res)
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                    })

             
            }
          })

          

    }

    //si paso eliminarCliente() se ejecuta solo
    //para pasar un id tengo que hacer () => eliminarCliente(id)


    return ( 
        <li className="cliente">
        <div className="info-cliente">
            <p className="nombre">{nombre}  {apellido}</p>
            <p className="empresa">{empresa}</p>
            <p>{email}</p>
            <p>{telefono}</p>
        </div>
        <div className="acciones">
            <Link  to={`/clientes/editar/${_id}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Cliente
            </Link>
            <button type="button" className="btn btn-rojo btn-eliminar"
            onClick={()=>eliminarCliente(_id)}
            >
                <i className="fas fa-times"></i>
                Eliminar Cliente
            </button>
            <Link  to={`/pedidos/nuevo/${_id}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Pedidos
            </Link>
        </div>
    </li>
     );
}
 
export default Cliente;