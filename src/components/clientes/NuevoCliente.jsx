import React , {Fragment, useState , useContext} from 'react';
import clientesAxios from '../config/axios';
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext'

//history para redireccionar
function NuevoCliente({history}){



    const [cliente, guardarCliente ] = useState({
        nombre : '',
        apellido : '',
        email : '',
        telefono : ''
    })

    const [ auth , guardarAuth ] = useContext( CRMContext )



    const actualizarState = e => {
       // console.log('alguien escribe') esto te sirve para saber si funciona
       guardarCliente({
           ...cliente ,
           [e.target.name] : e.target.value
       })
    }
    //agrega un cliente nuevo

    const agregarCliente = e => {
        e.preventDefault()
        clientesAxios.post('/clientes' ,cliente)
            .then(res=> {
          //      console.log(res)

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
          history.push('/')
            })
        //le pasamos al post cliente que seria todo lo que esta en el state
    }

    const validarCliente = () => {
        //destructurin del state
        const {nombre, apellido,email,telefono } = cliente

        let valido = !nombre.length || !apellido.length || !email.length || !telefono.length
        return valido
        //validarCliente()
        //lo pasamos de esa manera con parentisis para que se ejecute directamente
        //si loi paso sin parentesis no vahacer ninguna funcion
    //el state controla todo en tiempo real
    }


    if(!auth.auth && (localStorage.getItem('token') === auth.token)){
        history.push('/iniciar-sesion')
    }

    return(

        <Fragment>


<form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" 
                    name="nombre"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" 
                    onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa"
                                        onChange={actualizarState}

                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email"
                                        onChange={actualizarState}

                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono"
                                        onChange={actualizarState}

                    />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Cliente"
                        disabled={validarCliente()}
                         />
                </div>

            </form>

        </Fragment>

    )
}
//para redireccionar

export default withRouter(NuevoCliente)