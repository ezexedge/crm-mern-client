import React , {Fragment, useState, useEffect} from 'react';
import clientesAxios from '../config/axios';
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'
//history para redireccionar
function EditarCliente(props){

    const {id} = props.match.params

    const [cliente, datosCliente ] = useState({
        nombre : '',
        apellido : '',
        email : '',
        telefono : ''
    })
    //query a la api
const consultarApi = async () => {
    const clienteConsulta = await clientesAxios.get(`/clientes/${id}`)
    datosCliente(clienteConsulta.data)
    console.log(clienteConsulta.data)
}
    //useeffect

    useEffect( ()=> {
        consultarApi()
    },[])
//los corchetes es para que no se ejecute multiple veces


    const actualizarState = e => {
       // console.log('alguien escribe') esto te sirve para saber si funciona
       datosCliente({
           ...cliente ,
           [e.target.name] : e.target.value
       })
    }
    //agrega un cliente nuevo

    //agregamos la modificaciones a la bd

    const actualizarCliente = e => {
        e.preventDefault()
        //enviar peticion por axios

        clientesAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res=>{
                console.log(res)
                if(res.data.code === 11000){
                    console.log('error de duplicado mongo')
                    Swal.fire({
                      type: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!',
                    })
                }else{
                    console.log(res.data)
                    Swal.fire(
                      'Good job!',
                      res.data.mensaje,
                      'success'
                    )
                }
                //redireccionar
                props.history.push('/')
            })

    }
  
   

    return(

        <Fragment>


<form  onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" 
                    name="nombre"
                    onChange={actualizarState}
                    value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" 
                    onChange={actualizarState}
                    value={cliente.apellido}


                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa"
                                        onChange={actualizarState}
                                        value={cliente.empresa}


                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email"
                                        onChange={actualizarState}

                                                            value={cliente.email}

                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono"
                                        onChange={actualizarState}
                                                            value={cliente.telefono}


                    />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Cliente"
                      
                         />
                </div>

            </form>

        </Fragment>

    )
}
//para redireccionar

export default withRouter(EditarCliente)