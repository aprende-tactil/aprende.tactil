//Tomamos el form del html.
const form = document.getElementById('form')

// Funcion para iniciar sesión.
const login = async (e) => {

    // Evitamos el evento submit.
    e.preventDefault();

    // Tomamos los valores de los inputs.
    const email = document.getElementById('email').value;
    const contrasenia = document.getElementById('password').value;
    
    // Realizamos la peticion a nuestro servidor.
    const peticion = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        body: JSON.stringify({email, contrasenia}),
        headers: {
            'Content-type': 'application/json'
        }
    })

    // Convertimos en json la respuesta.
    const respuesta = await peticion.json();

    // En caso de que falle la peticion, mostrar el mensaje de error.
    if(!peticion.ok){
        alert(respuesta.msg)
    } else {

        // Caso contrario mostrar el mensaje.
        alert(respuesta.msg)

        // Seteamos el token en el localStorage.
        localStorage.setItem('token', respuesta.token);

        // Redirigimos al usuario a la landingPage.
        window.location.href = '/client/index.html'
    }

}

// Añadimos el evento submit al formulario.
form.addEventListener('submit', login);

