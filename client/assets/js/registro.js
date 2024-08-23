// Tomamos el form del HTML.
const form = document.getElementById('form');
alert('hola')
// Función para registrarse
const register = async (e) => {

    // Evitamos el evento submit por defecto.
    e.preventDefault();

    // Tomamos los valores de los inputs.
    const name = document.getElementById('nombre').value;
    const nameSchool = document.getElementById('nameSchool').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Realizamos la petición a nuestro servidor.
    const response = await fetch('http://localhost:4000/api/registro', {
        method: 'POST',
        body: JSON.stringify({name, nameSchool, email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Convertimos la respuesta a JSON.
    const data = await response.json();

    // En caso de que falle la petición, mostrar el mensaje de error.
    if (!response.ok) {
        alert(data.msg);
    } else {
        // Caso contrario, mostramos el mensaje.
        alert(data.msg);

        // Redirigimos al usuario al login.
        // window.location.href ='/client/registro/login.html';
    }
}

form.addEventListener('submit', register);
