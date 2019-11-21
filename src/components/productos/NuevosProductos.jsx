import React ,{useState,Fragment} from 'react'
import Swal from 'sweetalert2'
import clienteAxios from '../config/axios'
import {withRouter} from 'react-router-dom'

function NuevoProducto(props){


    const [producto , guardarProducto] = useState({
        nombre : '',
        precio : ''
    })
    //argamos la imagen aca
    const [archivo , guardarArchivo] = useState('')

    const leerInformacionProducto =  e => {
        e.preventDefault()

        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })

        console.log(producto)

    }

    //ponemos la imagen en state
    const leerImagen  = e => {
        guardarArchivo(e.target.files[0])
        console.log(e.target.files)
    }

    const agregarProducto = async e => {

        e.preventDefault()

        //crear formdata que esta asi configurado desde la rest api con node js y postmAN

        const formData = new FormData()
        formData.append('nombre',producto.nombre)
        formData.append('precio',producto.precio)
        formData.append('imagen',archivo)
        
        //lo almacenamos en la base de datos

        try{

        const res =    await clienteAxios.post('/productos',formData,{
                headers: {
                    'Content-type' : 'multipart/form-data'
                }
            })
            console.log(res.status)

            if(res.status === 200){
                Swal.fire(
                    'Good job!',
                    res.data.mensaje,
                    'success'
                  )
            }
            //redireccionamos

            props.history.push('/productos')



        }catch(error){
            
             console.log(error)
             
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
            })

        }

    }


    return(
        <Fragment>
        <h2>Nuevo Producto</h2>


        <form 
        onSubmit={agregarProducto}
        >
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input type="text" placeholder="Nombre Producto" name="nombre"
                onChange={leerInformacionProducto}
                />
            </div>

            <div className="campo">
                <label>Precio:</label>
                <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" 
                onChange={leerInformacionProducto}
                />
            </div>
        
            <div className="campo">
                <label>Imagen:</label>
                <input type="file"  name="imagen" 
                onChange={leerImagen}
                />
            </div>

            <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
            </div>
        </form>

        </Fragment>
        )
}

export default withRouter( NuevoProducto)