import React , {useState , useEffect , Fragment} from 'react';
import clienteAxios from '../config/axios'
import FormBuscarProducto from './FormBuscarProducto'
import Swal from 'sweetalert2'
import FormCantidadProducto from './FormCantidadProducto'
import  {withRouter} from 'react-router-dom'

function NuevoPedido(props){
    //extraemos el id del cliente

        const {id} = props.match.params
//state
//lo guardamos como un objeto por que el resultado de consultarAPI es un objeto
    const [ cliente , guardarCliente] = useState({})
    const [ busqueda , guardarBusqueda] = useState('')
    const [productos, guardarProductos] = useState([])
    const [total ,guardarTotal] = useState(0)

        useEffect(()=>{
            //obtener cliente
            const consultarAPI =  async () => {
                const resultado = await clienteAxios.get(`/clientes/${id}`)
                guardarCliente(resultado.data)

            }
            consultarAPI()
            //actualizamos el total 
            actualizarTotal()
        },[productos])

        const buscarProducto = async e => {
            e.preventDefault()
            //obtenemos productos de la busqueda
            const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`)
            console.log(resultadoBusqueda)
            
            if(resultadoBusqueda.data[0]){
                
                let productoResultado = resultadoBusqueda.data[0]
                //guardamos el id del producto
                productoResultado.producto = resultadoBusqueda.data[0]._id
                productoResultado.cantidad = 0
                //guardamos  el producto en el state
                //al arreglo le agregamos nuevos valores
                guardarProductos([...productos,productoResultado])
                console.log(productoResultado)

            }else{
                Swal.fire({
                    type: 'error',
                    title: 'no resultados',
                    text: 'no hay resultados'
                })
            }
        }


        const leerDatosBusqueda = e => {
            guardarBusqueda(e.target.value)
        }

        const restarProductos = i => {
            const todosProductos  = [...productos]

            if(todosProductos[i].cantidad === 0)return
            todosProductos[i].cantidad--
            guardarProductos(todosProductos)
        }
        
        const aumentarProductos = i => {

            const todosProductos = [...productos]
            todosProductos[i].cantidad++
            guardarProductos(todosProductos)

        }

        const actualizarTotal = () => {
            if(productos.length === 0){
                guardarTotal(0)
                return
            }
            let nuevoTotal = 0
            productos.map(producto => nuevoTotal += (producto.cantidad) * (producto.precio))
            guardarTotal(nuevoTotal)
        }

        //
        const eliminarProducto = id => {
           // console.log(id)
            const todosProductos = productos.filter(producto => producto._id !== id)
            guardarProductos(todosProductos)
        }



//almacena pedido en la base de datos
 const realizarPedidos = async e => {
     e.preventDefault()

    //extraemos id del cliente
    const {id} = props.match.params
    //construimos el objeto
    const pedido =  {
        "cliente" : id ,
        //productos lo paso como un arreglo 
        "pedido" : productos,
        "total" : total
    }
   // console.log(pedido)

   const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`,pedido)

   //leemos si es ok

   if(resultado.status === 200){
    Swal.fire({
        type: 'success',
        title: 'no resultados',
        //comunicamos el backend con frontend
        text: resultado.data.mensaje
    })

   }else{


    Swal.fire({
        type: 'error',
        title: 'no resultados',
        text: 'no hay resultados'
    })

   }

   props.history.push('/pedidos')

 }
    return(
        
        <Fragment>

            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido}</p>
            </div>

                <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
                />

                <ul className="resumen">

                    {productos.map((producto,index)=>(

                        <FormCantidadProducto
                        key={producto._id}
                        producto={producto}
                        aumentarProductos={aumentarProductos}
                        restarProductos={restarProductos}
                        eliminarProducto={eliminarProducto}
                        index={index}
                        />

                    ))}

           
                </ul>
              <p className="total">total a pagar :<span class="uk-badge">$ {total}</span></p>
              
              { total > 0 ? (
                  <form onSubmit={realizarPedidos}>
                      <input type="submit" value="realizar pedido" class="btn btn-verde btn-block"/>
                  </form>
              ) : null }
            
        </Fragment>

    )

}

export default withRouter(NuevoPedido)