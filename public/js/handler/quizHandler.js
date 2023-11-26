const questions = [
    {
        question: "¿En qué año nació Taylor Swift?",
        answers: ["1987", "1989", "1991"],
        correctAnswer: "1989"
    },
    {
        question: "¿Cual es el número favorito de Taylor Swift?",
        answers: ["13", "32", "89"],
        correctAnswer: "13"
    },
    {
        question: "¿Cuantos Grammy tiene Taylor Swift?",
        answers: ["3", "21", "12"],
        correctAnswer: "12"
    },
    // Más preguntas...
];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let quizStartTime;

function showQuestion() {
    // Si es la primera pregunta, registra el inicio del tiempo del quiz
    if (currentQuestionIndex === 0) {
        quizStartTime = new Date();
    }
    
    // Comprueba si todavía quedan preguntas por mostrar
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

function showAnswerOptions() {
    const currentQuestion = questions[currentQuestionIndex];
    const answersContainer = document.getElementById('answer-options');
    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(answer));
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    // Comprueba si la respuesta seleccionada es la correcta
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        correctAnswers++;
        alert("¡Respuesta correcta!"); // Feedback positivo, por ejemplo, usando un alert
    } else {
        wrongAnswers++;
        alert("Respuesta incorrecta."); // Feedback negativo
    }

    // Preparar para la siguiente pregunta
    currentQuestionIndex++;

    // Comprobar si quedan más preguntas
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Mostrar la siguiente pregunta
        showAnswerOptions(); // Actualizar las opciones de respuesta
    } else {
        showResults(); // Si no hay más preguntas, mostrar los resultados
    }
}

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    const resultsContainer = document.getElementById('results');
    resultsContainer.style.display = 'block';

    document.getElementById('correct-answers').textContent = `Respuestas correctas: ${correctAnswers}`;
    document.getElementById('wrong-answers').textContent = `Respuestas incorrectas: ${wrongAnswers}`;
    const quizEndTime = new Date();
    const quizDuration = (quizEndTime - quizStartTime) / 1000;
    document.getElementById('quiz-time').textContent = `Tiempo total: ${quizDuration} segundos`;
}

// Inicia el quiz al cargar la página
showQuestion();
