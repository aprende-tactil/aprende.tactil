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
    const texts = slide.querySelectorAll('h2, p, li'); 
    let fullText = '';

    texts.forEach(element => {
        fullText += element.textContent + ' ';
    });

    const utterance = new SpeechSynthesisUtterance(fullText.trim());
    utterance.lang = 'es-ES';  
    utterance.rate = 1;  
    window.speechSynthesis.speak(utterance);
}

// Función para dar la bienvenida
function welcomeMessage() {
    const welcomeText = "Ingreso a la parte de matematicas. Puedes navegar utilizando las teclas del navegador para ver el material disponible o volver a la pagina anterior presionando escape";
    const welcomeUtterance = new SpeechSynthesisUtterance(welcomeText);
    welcomeUtterance.lang = 'es-ES';  
    welcomeUtterance.rate = 0.8;  
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
            window.location.href = link.href;  // Abre el enlace en la misma pestaña
        } else {
            const button = currentSlide.querySelector('button'); // Selecciona el botón dentro de la diapositiva activa
            if (button) {
                const pdfFile = button.getAttribute('onclick').match(/'(.+\.pdf)'/)[1]; 
                window.location.href = `leerPDF.html?pdf=${pdfFile}`; 
            }
        }
    } else if (event.key === 'Escape') {
        window.history.back();
    }
});


document.querySelector('.slide').classList.add('active'); 
