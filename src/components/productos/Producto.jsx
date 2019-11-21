import React from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import clientesAxios from '../config/axios'

function Producto({producto}){

    const  { _id , nombre , precio , imagen} = producto


    const eliminarProducto = id => {

        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
           //elimino en la rest api
           clientesAxios.delete(`/productos/${id}`)
                .then(res=>{
                    if(res.status === 200){
                        if (result.value) {
                            //el res.data.mensaje lo importo de la api asi lo configure con node js
                            Swal.fire(
                              'Deleted!',
                              res.data.mensaje,
                              'success'
                            )
                          }
                    }
                })
          })

    }

return(

    <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">{precio}</p>
                        {imagen ? (
                        <img src={`http://localhost:3000/${imagen}`}/>
                        ) : null }
                    </div>
                    <div className="acciones">
                        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button type="button" className="btn btn-rojo btn-eliminar"
                        onClick={()=> eliminarProducto(_id)}
                        >
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>

)
}

export default Producto