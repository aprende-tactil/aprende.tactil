const form = document.getElementById('form')

// Funcion para iniciar sesión.
const login = async (e) => {

    e.preventDefault();

    
    const email = document.getElementById('email').value;
    const contrasenia = document.getElementById('password').value;
    
    //  peticion .
    const peticion = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        body: JSON.stringify({email, contrasenia}),
        headers: {
            'Content-type': 'application/json'
        }
    })

   
    const respuesta = await peticion.json();

    
    if(!peticion.ok){
        alert(respuesta.msg)
    } else {

        
        alert(respuesta.msg)

      
        localStorage.setItem('token', respuesta.token);

        window.location.href = '/client/'
    }

}
form.addEventListener('submit', login);

