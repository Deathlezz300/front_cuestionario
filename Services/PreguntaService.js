const onGetPreguntas=async()=>{
    if(localStorage.getItem('preguntas')){
        return JSON.parse(localStorage.getItem('preguntas'));
    }

    const response=await fetch('https://backend-cuestionario.onrender.com/api/preguntas',{
        headers:{
            'token':localStorage.getItem('token')
        }
    });

    const data=await response.json();

    return data.preguntas;

}

const onValidateRespuestas=async()=>{

    const respuestas=JSON.parse(sessionStorage.getItem('respuestas'));

    if(!respuestas) return window.location.href='../index.html'

    const response=await fetch('https://backend-cuestionario.onrender.com/api/preguntas/validar',{
        method:'POST',
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify({
            respuestas:respuestas,
        })
    })

    const data=await response.json();


    sessionStorage.removeItem('respuestas');

    return data;
}

export {
    onGetPreguntas,
    onValidateRespuestas
}