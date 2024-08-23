 // Preguntas y respuestas
 const questions = [
    { question: "¿Cuál es la función de un adjetivo?", answers: ["Modificar un sustantivo", "Sustituir un sustantivo", "Indicar lugar", "Unir oraciones"], correct: 0 },
    { question: "¿Qué es un pronombre?", answers: ["Una palabra que sustituye a un sustantivo", "Una palabra que modifica a un adjetivo", "Una palabra que expresa una acción", "Una palabra que indica tiempo"], correct: 0 },
    { question: "¿Qué es una oración compuesta?", answers: ["Una oración con un solo sujeto", "Una oración que tiene más de una proposición", "Una oración sin verbo", "Una oración que contiene una interjección"], correct: 1 },
    { question: "¿Cuál es el complemento directo en la oración 'Juan lee un libro'?", answers: ["Juan", "lee", "un libro", "Ninguno"], correct: 2 }
];

let currentQuestionIndex = 0;
let selectedAnswerIndex = null;

// Seleccionar un elemento por ID
function $(id) {
    return document.getElementById(id);
}

// Función para actualizar la pregunta y respuestas
function updateQuestion() {
    const question = questions[currentQuestionIndex];
    $("question").textContent = question.question;
    $("answers").innerHTML = '';
    question.answers.forEach((answer, index) => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.dataset.index = index;
        li.onclick = () => selectAnswer(index);
        $("answers").appendChild(li);
    });
    selectedAnswerIndex = null;
    $("feedback").textContent = '';
    speakQuestionAndAnswers();
}

// Función para seleccionar una respuesta
function selectAnswer(index) {
    const answers = $("answers").children;
    for (let i = 0; i < answers.length; i++) {
        answers[i].classList.remove('selected');
    }
    answers[index].classList.add('selected');
    selectedAnswerIndex = index;
    speakAnswer(index);
}

// Función para leer la pregunta y las respuestas
function speakQuestionAndAnswers() {
    const question = questions[currentQuestionIndex].question;
    const utterance = new SpeechSynthesisUtterance(question + " " + questions[currentQuestionIndex].answers.join(", "));
    speechSynthesis.speak(utterance);
}

// Función para leer la respuesta seleccionada
function speakAnswer(index) {
    const answer = questions[currentQuestionIndex].answers[index];
    const utterance = new SpeechSynthesisUtterance("Estas en la respuesta: " + answer);
    speechSynthesis.speak(utterance);
}

// Función para mostrar la siguiente pregunta
function nextQuestion() {
    if (selectedAnswerIndex === null) {
        return; // No hace nada si no se ha seleccionado una respuesta
    }
    const correctIndex = questions[currentQuestionIndex].correct;
    const feedbackElement = $("feedback");
    if (selectedAnswerIndex === correctIndex) {
        feedbackElement.textContent = '¡Correcto! Pasando a la siguiente pregunta.';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = 'Respuesta incorrecta. Pasando a la siguiente pregunta.';
        feedbackElement.style.color = 'red';
    }
    speakFeedback(feedbackElement.textContent);
    setTimeout(() => {
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        updateQuestion();
    }, 2000); 
}

// Función para leer el feedback
function speakFeedback(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
}

function handleKeyPress(event) {
    if (event.key === 'ArrowUp') {
        // Cambiar selección hacia arriba
        if (selectedAnswerIndex > 0) {
            selectAnswer(selectedAnswerIndex - 1);
        }
    } else if (event.key === 'ArrowDown') {
        // Cambiar selección hacia abajo
        const answers = $("answers").children;
        if (selectedAnswerIndex < answers.length - 1) {
            selectAnswer(selectedAnswerIndex + 1);
        }
    } else if (event.key === 'Enter') {
        // Confirmar respuesta
        nextQuestion();
    } else if (event.key === 'Escape') {
        // Volver a la página anterior
        window.history.back();
    }
}


document.addEventListener('keydown', handleKeyPress);
$("next").onclick = nextQuestion;

// Función para reproducir las instrucciones
function speakInstructions() {
    const instructions = "Bienvenido al juego de lengua. Usa las flechas arriba y abajo para seleccionar una respuesta y presiona Enter para confirmar. Se pasará a otra pregunta luego de responder. Puedes salir del juego en cualquier momento presionando Escape.";
    const utterance = new SpeechSynthesisUtterance(instructions);
    speechSynthesis.speak(utterance);
}

// Inicializar el juego
speakInstructions();
updateQuestion();