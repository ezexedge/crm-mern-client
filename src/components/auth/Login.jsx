import React , {useState,useContext} from 'react'
import Swal from 'sweetalert2'
import clientesAxios from '../../components/config/axios'
import {Link,withRouter} from 'react-router-dom'
//CONTEXT
import {CRMContext} from '../../context/CRMContext'

function Login(props){

    const [auth ,guardarAuth] = useContext(CRMContext)
    const [credenciales , guardarCredenciales] = useState({})
    console.log(auth)
    
    //iniciar sesionr
    const iniciarSesion = async e => {
        e.preventDefault()
        //autenticar al usuario

        try{

            const respuesta = await clientesAxios.post('/iniciar-sesion',credenciales)
            //si status 200 ok entonces en la data me va a dar el token  y de ahi vamos a tener que extraerla
            //console.log(respuesta)
            const {token } = respuesta.data
            //lo guardo en localstorage por que si uso cookies es mas peligrosos por que hay programaas que mapean los cookies y roban datos

            localStorage.setItem('token' , token)

            guardarAuth({
                token,
                auth : true
            })

            Swal.fire(
                'login correcto',
                'has iniciado sesion',
                'success'
            )
            props.history.push('/')

        }catch(error){
            console.log(error)
            Swal.fire({
                type : 'error',
                title: 'hubo un error',
                text: error.response.data.mensaje
            })

        }

    }

    const leerDatos = e => {

        guardarCredenciales({
            ...credenciales ,
            [e.target.name] : e.target.value
        })

    }


    return(

        <div className="login">
            <h2>iniciar sesion</h2>
                <div className="contendor-formulario">
                    <form
                        onSubmit={iniciarSesion}
                    >
                        <div className="campo">
                            <label>Email</label>
                            <input type="text"
                            name="email"
                            placeholder="ingrese email"
                            required
                            onChange={leerDatos}
                            />

                        </div>
                        <div className="campo">
                            <label>Password</label>
                            <input type="password"
                            name="password"
                            placeholder="ingrese password"
                            required
                            onChange={leerDatos}
                            />

                        </div>
                        <input type="submit" value="Iniciar sesion" className="btn btn-verde btn-block" />
                    </form>
                </div>

              
        </div>


    )
}

export default withRouter(Login)