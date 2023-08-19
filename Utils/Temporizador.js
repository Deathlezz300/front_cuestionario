const guardarTiempo=(numero)=>{
    sessionStorage.setItem('tiempo',JSON.stringify(numero));
}

const TiempoAcabado=()=>{
    const respustas=sessionStorage.getItem('respuestas') ? JSON.parse(sessionStorage.getItem('respuestas')) : [];
    const preguntas=JSON.parse(localStorage.getItem('preguntas'));

    const diferencia=preguntas.length-respustas.length;
    let restantes=[];

    for(let s=1;s<=diferencia;s++){
        restantes.push({
            id:(respustas.length-1)+s,
            respuestas:[0]
        })
    }

    console.log(restantes);

    sessionStorage.setItem('respuestas',JSON.stringify([...respustas,...restantes]));
    window.location.href='../screens/resultados.html'
}

const ActualizarTiempoEtiqueta=(valor)=>{
    const temp= document.getElementById("campoTemp")
    const minutos=Math.floor(valor/60);
    const segundos=valor%60
    temp.textContent=`Tiempo restante ${minutos} minutos y ${segundos} segundos`

}

export {
    guardarTiempo,
    TiempoAcabado,
    ActualizarTiempoEtiqueta
}