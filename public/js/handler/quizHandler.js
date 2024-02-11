// Array de objetos que representa las preguntas del quiz
const questions = [
    {
        question: "¿En qué año nació Taylor Swift?",
        answers: ["1987", "1989", "1991"],
        correctAnswer: "1989"
    },
    {
        question: "¿Cuál es el número favorito de Taylor Swift?",
        answers: ["13", "32", "89"],
        correctAnswer: "13"
    },
    {
        question: "¿Cuántos Grammy tiene Taylor Swift?",
        answers: ["3", "21", "13"],
        correctAnswer: "13"
    },
    // Más preguntas...
];

// Variables para llevar el control del estado del quiz
let currentQuestionIndex = 0; // Índice de la pregunta actual
let correctAnswers = 0; // Contador de respuestas correctas
let wrongAnswers = 0; // Contador de respuestas incorrectas
let quizStartTime; // Variable para almacenar el inicio del tiempo del quiz

// Función para mostrar la pregunta actual
function showQuestion() {
    // Si es la primera pregunta, registra el inicio del tiempo del quiz
    if (currentQuestionIndex === 0) {
        quizStartTime = new Date();
    }
    
    // Comprueba si aún quedan preguntas por mostrar
    if (currentQuestionIndex < questions.length) {
        // Obtiene la pregunta actual basándose en el índice
        const currentQuestion = questions[currentQuestionIndex];

        // Establece el texto de la pregunta en el elemento HTML correspondiente
        document.getElementById('question').textContent = currentQuestion.question;

        // Llama a la función para mostrar las opciones de respuesta
        showAnswerOptions();
    } else {
        // Si todas las preguntas han sido respondidas, muestra los resultados
        showResults();
    }
}

// Función para mostrar las opciones de respuesta para la pregunta actual
function showAnswerOptions() {
    const currentQuestion = questions[currentQuestionIndex];
    const answersContainer = document.getElementById('answer-options');
    answersContainer.innerHTML = ''; // Limpia las respuestas anteriores

    // Itera sobre las respuestas y crea un botón para cada una
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(answer));
        answersContainer.appendChild(button);
    });
}

// Función para comprobar si la respuesta seleccionada es correcta
function checkAnswer(selectedAnswer) {
    // Comprueba si la respuesta seleccionada es la correcta
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        correctAnswers++;
        alert("¡Respuesta correcta!"); // Muestra un mensaje de respuesta correcta
    } else {
        wrongAnswers++;
        alert("Respuesta incorrecta."); // Muestra un mensaje de respuesta incorrecta
    }

    // Prepara para la siguiente pregunta
    currentQuestionIndex++;

    // Comprueba si quedan más preguntas
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Muestra la siguiente pregunta
    } else {
        showResults(); // Si no hay más preguntas, muestra los resultados
    }
}

// Función para mostrar los resultados del quiz
function showResults() {
    document.getElementById('quiz-container').style.display = 'none'; // Oculta el contenedor del quiz
    const resultsContainer = document.getElementById('results');
    resultsContainer.style.display = 'block'; // Muestra el contenedor de resultados

    // Prepara y muestra los detalles de los resultados
    const correctAnswersContent = `Respuestas correctas: ${correctAnswers}`;
    const wrongAnswersContent = `Respuestas incorrectas: ${wrongAnswers}`;
    const quizEndTime = new Date();
    const quizDuration = (quizEndTime - quizStartTime) / 1000; // Calcula la duración del quiz
    const quizTimeContent = `Tiempo total: ${quizDuration} segundos`;

    // Crea y muestra una tabla con los resultados
    const resultsTable = `
        <table>
            <tr>
                <th colspan="2">Resultados del Quiz</th>
            </tr>
            <tr>
                <td>Respuestas Correctas</td>
                <td>${correctAnswersContent}</td>
            </tr>
            <tr>
                <td>Respuestas Incorrectas</td>
                <td>${wrongAnswersContent}</td>
            </tr>
            <tr>
                <td>Tiempo Total</td>
                <td>${quizTimeContent}</td>
            </tr>
        </table>`;

    resultsContainer.innerHTML = resultsTable;
}

// Inicia el quiz al cargar la página
showQuestion();
