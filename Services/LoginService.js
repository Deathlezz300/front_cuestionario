

const GenerateJWT=async(nombre)=>{
    const response=await fetch('https://backend-cuestionario.onrender.com/api/auth/',{
        method:'POST',
        body:JSON.stringify({
            name:nombre
        })
    });
    const data=await response.json();
    if(data.ok){
        localStorage.setItem('userName',nombre)
    }
    return data;
}

const validarToken=async(token)=>{
    console.log("hola2")
    const response=await fetch('https://backend-cuestionario.onrender.com/api/renovar',{
        headers:{
            "token":token
        }
    });
    const data=await response.json();

    return data;
}



export {
    GenerateJWT,
    validarToken,
}