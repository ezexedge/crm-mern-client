import React , {useState,useEffect,Fragment} from 'react'
import Swal from 'sweetalert2'
import clienteAxios from '../config/axios'
import {withRouter} from 'react-router-dom'
import Spinner from '../layout/Spinner'

function EditarProducto(props){
//obtener el id del  prodocuto
//que lo pasamos como un parametro
const {id} = props.match.params


const [producto , guardarProducto] = useState({
    nombre: '',
    precio : '',
    imagen: ''
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


//consultamos la api para traer el producto a edita

useEffect(()=>{

    const consultarAPI = async () => {
        const consultaProducto = await clienteAxios.get(`/productos/${id}`)
        console.log(consultaProducto.data)
        guardarProducto(consultaProducto.data)
    }

consultarAPI()
},[])


//ponemos la imagen en state
const leerImagen  = e => {
    guardarArchivo(e.target.files[0])
    console.log(e.target.files)
    }

    //edito un producto en la base datos
const editarProducto = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('nombre',producto.nombre)
    formData.append('precio',producto.precio)
    formData.append('imagen',archivo)
    
    //lo almacenamos en la base de datos

    try{

    const res =    await clienteAxios.put(`/productos/${id}`,formData,{
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
    

//extraigo el valor del state

const {nombre , precio , imagen} = producto




    return(
        <Fragment>
        <h2>editar Producto</h2>


        <form 
        onSubmit={editarProducto}
        >
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input type="text" placeholder="Nombre Producto" name="nombre"
                onChange={leerInformacionProducto}
                defaultValue={nombre}
                />
            </div>

            <div className="campo">
                <label>Precio:</label>
                <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" 
                onChange={leerInformacionProducto}
                defaultValue={precio}

                />
            </div>
        
            <div className="campo">
                {imagen ? (
                    <img src={`http://localhost:3000/${imagen}`} width="300" />
                ) : null }
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

export default withRouter(EditarProducto)