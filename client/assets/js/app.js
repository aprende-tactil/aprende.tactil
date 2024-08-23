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
    utterance.rate = 0.8;  
    window.speechSynthesis.speak(utterance);
}

// Función de bienvenida a la pagina
function welcomeMessage() {
    const welcomeText = "Bienvenido a nuestra página educativa. Puedes navegar utilizando las flechas del teclado para navegar entre las materias.";
    const welcomeUtterance = new SpeechSynthesisUtterance(welcomeText);
    welcomeUtterance.lang = 'es-ES';  
    welcomeUtterance.rate = 0.8;  
    window.speechSynthesis.speak(welcomeUtterance);
}

// Ejecuta mensaje de bienvenida al cargar la página
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
            const button = currentSlide.querySelector('button'); 
            if (button) {
                const pdfFile = button.getAttribute('onclick').match(/'(.+\.pdf)'/)[1]; 
                window.location.href = `leerPDF.html?pdf=${pdfFile}`; 
            }
        }
    } else if (event.key === 'Escape') {
        window.history.back();
    }
});