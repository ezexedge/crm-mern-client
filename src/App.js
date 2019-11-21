//importar useContext para poder usar context dentro del sitio web
import React ,{Fragment,useContext,useEffect} from 'react';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'  

/** layout **/
import Header from './components/layout/Header'
import Navegacion from './components/layout/Navegacion'
/* componentes */
//clientes
import Clientes from './components/clientes/Clientes'
import NuevoCliente from './components/clientes/NuevoCliente'
import EditarCliente from './components/clientes/EditarCliente'
///productos
import Productos from './components/productos/Productos'
import EditarProducto from './components/productos/EditarProducto'
import NuevoProducto from './components/productos/NuevosProductos'
//pedido
import Pedidos from './components/pedidos/Pedidos'
import NuevoPedido from './components/pedidos/NuevoPedido'
import Login from './components/auth/Login'


import {CRMContext ,CRMProvider} from './context/CRMContext'

function App() {

  //utilizar context en el compnente
  //usamos useContext para que se conecte con el context que creamos anteirometne
//puedo acceder a auth  y guardarAuth puedo acceder a ellos sin la necesidad de pasas prorps
/// la heredan todos lo componentes por defecto

  const [auth , guardarAuth] = useContext(CRMContext)
  //ahora le pasamos a todos lo componenetes el CRMcontext que les va a pasar los valores
  ///provider es el que provee la informaicion

  
  return(
    <Router>
          <Fragment>
            
            <CRMProvider value={[auth, guardarAuth]}>

            <Header/>
      
            <div className="grid contenedor contenido-principal">

              <Navegacion/>
                    <main class="caja-contenido col-9">

                      <Switch>

                          <Route exact path="/" component={Clientes}/>
                          <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                          <Route exact path="/clientes/editar/:id" component={EditarCliente} />

                          <Route exact path="/productos" component={Productos}/>
                          <Route exact path="/productos/nuevo" component={NuevoProducto}/>
                          <Route exact path="/productos/editar/:id" component={EditarProducto}/>

                          <Route exact path="/pedidos" component={Pedidos}/>
                          <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido}/>
                          
                          <Route exact path="/iniciar-sesion" component={Login}/>


                      </Switch>

                    
                  </main>
            </div>
            </CRMProvider>

          </Fragment>
    </Router>
  )
  
}

export default App;
