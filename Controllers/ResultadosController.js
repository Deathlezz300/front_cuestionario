import { onValidateRespuestas } from "../Services/PreguntaService.js"

const validarResultados=async()=>{

    const {resultados,nota}=await onValidateRespuestas();
    const preguntas=JSON.parse(localStorage.getItem('preguntas'));
    document.getElementById("tituloNota").textContent=`Su calificación es de ${nota.toFixed(1)}`

    resultados.forEach(resultado=>{
        const opciones=preguntas.find(pregu=>pregu.id===resultado.idPregunta)
        onCreateCard(resultado.idSelecciones,opciones,resultado.idCorrectas)
    })

}

const onCreateCard=(resultado,pregunta,correctas)=>{

    const div=document.createElement('div');
    div.classList.add('boxDivPregunta');
    const opciones=pregunta.opciones;
    const value=
    `<h2 id="tituloNumPregunta" class="tituloNumPregunta">Pregunta ${pregunta.id+1} de 8</h2>
                <p id="textoPregunta" class="TextoPregunta">${pregunta.pregunta}</p>
                <h3 class="tituloOpciones">Opciones</h3>
                <ul id="listaOpciones" class="boxOpciones">
                    ${opciones.map(pregu=>{
                        return `<li>
                        <button class="botonOpcion">${pregu.texto}</button> 
                        </li>`
                    }).join('')}
                </ul>
                <h3 class="tituloOpciones">Tu selección</h3>
                <ul id="listaOpciones" class="boxOpciones">
                    ${resultado.map(result=>{
                        return `<li>
                                <button class="botonOpcion ${result.decision ? 'opcionCorrecta' : 'opcionIncorrecta'}">${result.id===0 ? 'No seleccionó' : 
                                opciones.find(pre=>pre.id===result.id).texto}</button> 
                            </li>`
                    }).join('')}
                </ul>
                <h3 class="tituloOpciones">Resupuestas correctas</h3>
                <ul id="listaOpciones" class="boxOpciones">
                    ${correctas.map(corre=>{
                        return `<li>
                            <button class="botonOpcion opcionCorrecta">${opciones.find(op=>op.id===corre).texto}</button> 
                        </li>`
                    }).join('')}
                </ul>
    
    `
    div.innerHTML=value;
    document.querySelector(".boxSectionResultados").appendChild(div);
}

validarResultados();