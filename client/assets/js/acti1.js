  // Función para hablar el texto proporcionado
  function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; 
    utterance.onend = function() {
        speakText("Puedes presionar la tecla Escape para volver a la página anterior.");
    };
    speechSynthesis.speak(utterance);
}

// Función para leer todo el contenido del div
function readContent() {
    const contentDiv = document.querySelector('.content');
    const textToSpeak = contentDiv.textContent || contentDiv.innerText;
    speakText(textToSpeak);
}

// Función para manejar el evento de tecla Escape
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        speechSynthesis.cancel();
   
        window.history.back(); 
    }
}

// Llama a la función para hablar el contenido al cargar la página
window.onload = function() {
    speakText("Conceptos básicos de matemáticas");
    setTimeout(readContent, 3000);
};

// Añade un evento para escuchar la tecla Escape
window.addEventListener('keydown', handleEscapeKey);