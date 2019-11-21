import React , {useEffect ,useState , Fragment}from 'react'
import clientesAxios from '../config/axios'
import DetallesPedido from './DetallesPedido'

const Pedidos = () => {
    const [ pedidos ,guardarPedidos ]  = useState([])


    //nos sirve para visitar la base de datos
    useEffect(()=>{

        const consultarApi = async () => {
            //obrener los pedidos
            const resultado = await clientesAxios.get('/pedidos')
            guardarPedidos(resultado.data)
           

        }

        consultarApi()


    },[])


    console.log(pedidos)

    return (  

        <Fragment>
            <h2>pedidos</h2>
 <ul className="listado-pedidos">
          
          {pedidos.map(pedido=>(
              <DetallesPedido
              key={pedido._id}
              pedido={pedido}
              />
          ))}
             
            </ul>

        </Fragment>
    );
}
 
export default Pedidos;