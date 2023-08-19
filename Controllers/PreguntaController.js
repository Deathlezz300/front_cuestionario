import { ActualizarTiempoEtiqueta, TiempoAcabado } from "../Utils/Temporizador.js";

let data=[];
let id2=new URL(window.location).searchParams.get("id")
const datasPreguntas=JSON.parse(localStorage.getItem('preguntas'));
const boton=document.getElementById("botonNextPregunta");
const titulo=document.getElementById("tituloNumPregunta");
titulo.textContent=`Pregunta de selección ${datasPreguntas[id2].tipo}`
let tiempo=JSON.parse(sessionStorage.getItem('tiempo'));

const autoPeticion=setInterval(()=>{
    fetch('https://backend-cuestionario.onrender.com/api/auth/hola').then(res=>res.json()).then(()=>console.log('conectado'));
},7000);


const temporizador=setInterval(()=>{
    if(tiempo===0){
        TiempoAcabado();
        return clearInterval(temporizador);
    }

    tiempo--;
    ActualizarTiempoEtiqueta(tiempo);

},1000)

if(parseInt(id2)+1===datasPreguntas.length){
    boton.textContent='Terminar cuestionario'
}

boton.addEventListener("click",()=>{
    const url=new URL(window.location);
    const id=url.searchParams.get("id");

    if(data.length===0){
        return MostrarMensaje();
    }

    clearInterval(autoPeticion);
    let respuestas=sessionStorage.getItem('respuestas') ? JSON.parse(sessionStorage.getItem('respuestas')) : []
    const objeto={
        id,
        respuestas:data
    }
    respuestas=[...respuestas,objeto]
    sessionStorage.setItem('respuestas',JSON.stringify(respuestas));

    if(parseInt(id)+1>=datasPreguntas.length){
        sessionStorage.removeItem('tiempo');
        window.location.href=`../screens/resultados.html`
        return ;
    }    

    sessionStorage.setItem('tiempo',JSON.stringify(tiempo));
    return window.location.href=`../screens/pregunta.html?id=${parseInt(id)+1}`;
})

const obtenerInformacion=async()=>{

    const url=new URL(window.location);
    const id=url.searchParams.get("id");

    if(id===null || !datasPreguntas[parseInt(id)]){
        window.location.href="../index.html";
    }

    const pregunta=datasPreguntas[parseInt(id)];

    document.getElementById("textoPregunta").textContent=pregunta.pregunta;

    const lista=document.getElementById("listaOpciones");

    pregunta.opciones.forEach(opcion=>{
        const opcionElemento=crearOpcion(opcion.texto,opcion.id,pregunta.tipo);
        lista.appendChild(opcionElemento);
    })

}

const crearOpcion=(opcion,idOpcion,tipo)=>{

    const elemento=document.createElement('li');
    const boton=document.createElement("button");
    boton.value=opcion;
    boton.textContent=opcion;
    boton.id=idOpcion;
    boton.classList.add("botonOpcion");
    boton.addEventListener("click",(evento)=>onClickOpcion(evento,idOpcion,tipo))
    elemento.appendChild(boton);

    return elemento;

}

const onClickOpcion=(evento,idOpcion,tipo)=>{

    if(data.includes(idOpcion)){
         data=data.filter(opcio=>opcio!=idOpcion);
         evento.target.classList.remove("colorAzulOpcion")
         evento.target.classList.add("colorBlancoOpcion")
         return;
    }

    if(tipo==='multiple'){
        evento.target.classList.add("colorAzulOpcion")
         evento.target.classList.remove("colorBlancoOpcion")
        data.push(idOpcion);
        return;
    }

    const opciones=document.querySelectorAll(".botonOpcion");
        opciones.forEach(opcion=>{
            if(opcion.id!=evento.target.id){
                opcion.classList.remove("colorAzulOpcion");
                opcion.classList.add("colorBlancoOpcion");
            }else{
                opcion.classList.add("colorAzulOpcion");
                opcion.classList.remove("colorBlancoOpcion");
            }
        })
    data=[idOpcion];

}

const MostrarMensaje=()=>{
    const texot=document.getElementById("textoError");
    texot.classList.toggle('errorOpcion2');
    setTimeout(()=>{
        texot.classList.toggle('errorOpcion2');
    },2000)
}



obtenerInformacion();

