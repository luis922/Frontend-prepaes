import React, { Component } from 'react';
import '../hojas-de-estilo/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


import Cookies from 'universal-cookie';
const cookies = new Cookies();

const baseUrl="http://localhost:3001/usuarios";


class Login extends Component{ 

    state={
        form:{
            mail: '',
            password: ''
        }
    }
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params: {mail: this.state.form.mail, password: this.state.form.password}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('username', respuesta.username, {path: "/"});
                cookies.set('score', respuesta.score, {path: "/"});
                window.location.href="./Menu";
            }else{
                alert('El usuario o la contraseña no son correctos');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    } 
    /*iniciarSesionFa=async()=>{

        let usuario={
            id: 10,
            username: "prueba2",
            mail: "prueba2@gmail.com",
            password: "prueba2"
          }
        await axios.post(baseUrl, usuario);
        



    } */
    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="/Menu";
        }
    }
    


    render() {
    return(
        
        <body className="cuerpoLogin">
   
    <form className="formulario" id="formularioL">
        <h1 className="hero_register">Iniciar Sesión</h1>
        <div className="contenedor ">
        
            
            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faEnvelope} />
            <input name="mail" id="emailL" type="text" onChange={this.handleChange} placeholder="Correo Electronico"/>
            
            </div>
            
            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faKey} />
            <input type="password" name="password" id="passwordL" onChange={this.handleChange} placeholder="Contraseña"/>
            
            </div>
            <button type="button" id="login" className="button" onClick={()=>this.iniciarSesion()}>Iniciar Sesión</button>
            <p className='pLogin'>Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.</p>
            <p className='pLogin'>¿No tienes una cuenta? <a className="link" href="/Register" >Registrate</a></p>
        </div>
        </form>

        </body>
    );
    }    
 }
 export default Login;
