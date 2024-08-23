let index = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(slideIndex) {
    const offset = -slideIndex * 100;
    document.querySelector('.carrusel').style.transform = `translateX(${offset}%)`;
    speakCurrentSlide(slideIndex);
}

function nextSlide() {
    index = (index + 1) % totalSlides;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide(index);
}

function speakCurrentSlide(slideIndex) {
    const slide = slides[slideIndex];
    const texts = slide.querySelectorAll('h2, p, li'); // Selecciona los elementos que quieres leer
    let fullText = '';

    texts.forEach(element => {
        fullText += element.textContent + ' ';
    });

    const utterance = new SpeechSynthesisUtterance(fullText.trim());
    utterance.lang = 'es-ES';  // Configura el idioma a español (España)
    utterance.rate = 1;  // Configura la velocidad (1 es normal, menos de 1 es más lento)
    window.speechSynthesis.speak(utterance);
}

// Función para dar la bienvenida
function welcomeMessage() {
    const welcomeText = "Ingreso a la parte de Lengua y literatura. Puedes navegar utilizando las teclas del navegador para ver el material disponible.";
    const welcomeUtterance = new SpeechSynthesisUtterance(welcomeText);
    welcomeUtterance.lang = 'es-ES';  // Configura el idioma a español (España)
    welcomeUtterance.rate = 0.8;  // Hace que el mensaje se lea más lento
    window.speechSynthesis.speak(welcomeUtterance);
}

// Ejecutar mensaje de bienvenida al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    welcomeMessage();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        nextSlide();
    } else if (event.key === 'ArrowLeft') {
        prevSlide();
    } else if (event.key === 'Enter') {
        const currentSlide = slides[index];
        const link = currentSlide.querySelector('a');  // Selecciona el primer enlace en el slide
        if (link) {
            window.open(link.href);  // Abre el enlace en una nueva pestaña
        } else {
            const button = currentSlide.querySelector('button'); // Selecciona el botón dentro de la diapositiva activa
            if (button) {
                const pdfFile = button.getAttribute('onclick').match(/'(.+\.pdf)'/)[1]; // Extrae el nombre del PDF
                window.open(`leerPDF.html?pdf=${pdfFile}`, '_blank'); // Abre leerPDF.html con el PDF especificado
            }
        }
    }
});

// Ejemplo para marcar una diapositiva como activa (puedes personalizar esta lógica)
document.querySelector('.slide').classList.add('active'); // Marca la primera diapositiva como activa
