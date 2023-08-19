import { GenerateJWT,validarToken } from "../Services/LoginService.js";
import { onGetPreguntas } from "../Services/PreguntaService.js";

fetch('https://backend-cuestionario.onrender.com/api/auth/hola').then(res=>res.json()).then(()=>console.log('conectado'));

const startLogin=async(evento)=>{
    

    sessionStorage.setItem('tiempo',JSON.stringify(300))

    if(!localStorage.getItem('userName')){
        const value=document.getElementById("loginId").value;
        const data=await GenerateJWT(value);
        localStorage.setItem('token',data.token);
    }

    if(!localStorage.getItem('preguntas')){
        const preguntas=await onGetPreguntas();
        localStorage.setItem('preguntas',JSON.stringify(preguntas));
    }
    window.location.href='screens/pregunta.html?id=0';
    
}


const botonTest=document.getElementById("botonTest");
botonTest.addEventListener("click",startLogin);

if(localStorage.getItem('userName')){
    const nombre=localStorage.getItem('userName')
    document.getElementById("tituloLogin").textContent=`Bienvenido ${nombre}`
    document.querySelector('.input-group').style.display='none'
}

