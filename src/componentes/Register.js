import React, { Component } from 'react';
import '../hojas-de-estilo/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey,faEnvelope,faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


import Cookies from 'universal-cookie';
const cookies = new Cookies();

const baseUrl="http://localhost:3001/usuarios";


class Register extends Component{ 

    state={
        form:{
            mail:'',
            nombre:'',
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


    Registrarse=async()=>{
        let usuario={
            
            username: this.state.form.nombre,
            mail: this.state.form.mail,
            password: this.state.form.password,
            score: 0
          }
        await axios.post(baseUrl, usuario)
        window.location.href = "./Login"

     } 

    ComprobarRegistro=async()=>{
        
        await axios.get(baseUrl, {params: {mail: this.state.form.mail}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                alert('Este correo ya esta registrado');
            }else{
                this.Registrarse();
            }
        })
        .catch(error=>{
            console.log(error);
        })


      


    } 
    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="/Menu";
        }
    }
    


    render() {
    return(
        <body className="cuerpoLogin">
   
    <form className="formulario" id="formularioL">
        <h1 className="hero_register">Registro</h1>
        <div className="contenedor ">
            
        <div class="input-contenedor ">
           
           <FontAwesomeIcon className='icon' icon={ faUser} />
           <input name="nombre" id="" type="text" onChange={this.handleChange} placeholder="Nombre" />
    
       </div>
            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faEnvelope} />
            <input name="mail" id="emailL" type="text" onChange={this.handleChange} placeholder="Correo Electronico"/>
            
            </div>
            
            
            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faKey} />
            <input type="password" name="password" id="passwordL" onChange={this.handleChange} placeholder="Contraseña"/>
            
            </div>
            <button type="button" id="login" className="button" onClick={()=>this.ComprobarRegistro()}>Registrate</button>
            <p className='pLogin'>Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.</p>
            <p className='pLogin'>¿Ya tienes una cuenta? <a className="link" href='./Login' >Iniciar Sesion</a></p>
        </div>
        </form>

        </body>
    );
    }    
 }
 export default Register;
